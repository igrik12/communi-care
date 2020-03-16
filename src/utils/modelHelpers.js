import { API, graphqlOperation, Auth } from 'aws-amplify';
import {
  createCompany,
  createStaff,
  createClient,
  deleteCompany,
  deleteClient,
  deleteStaff
} from '../graphql/mutations';
import async from 'async';

// Check if company with name X exists
export const companyExists = (company, allCompanies) => {
  if (!allCompanies.length) return undefined;
  return allCompanies.find(comp => comp.name === company.name);
};

// Create new company
export const createNewCompany = async company => {
  const { name, companyLogoUrl } = company;
  const details = { input: { name, companyLogoUrl } };
  const result = await API.graphql(graphqlOperation(createCompany, details));
  return result.data.createCompany;
};

export const createNewStaff = companyId => async staff => {
  const { username, userType, permissions, password, email, phone_number } = staff;
  const details = {
    input: {
      username,
      userType,
      email,
      phone_number,
      staffCompanyId: companyId,
      permissions: permissions ? permissions.map(perm => perm.value) : []
    }
  };
  await API.graphql(graphqlOperation(createStaff, details));
};

export const signUpUser = async staff => {
  const { username, password, email, phone_number } = staff;
  await Auth.signUp({ username, password, attributes: { email, phone_number } });
};

export const createNewClient = companyId => async client => {
  const { name } = client;
  const details = { input: { name, clientCompanyId: companyId } };
  await API.graphql(graphqlOperation(createClient, details));
};

export const deleteCompanyAsync = async id => {
  const details = { input: { id } };
  await API.graphql(graphqlOperation(deleteCompany, details));
};

export const deleteStaffAsync = async id => {
  const details = { input: { id } };
  await API.graphql(graphqlOperation(deleteStaff, details));
};

export const deleteClientAsync = async id => {
  const details = { input: { id } };
  await API.graphql(graphqlOperation(deleteClient, details));
};

export const deleteCompanyDependencies = (company, removeStaff, removeClients) => {
  const clientIds = company.client.items.map(client => client.id);
  const staffIds = company.staff.items.map(st => st.id);

  async.each(
    staffIds,
    function(id, callback) {
      try {
        deleteStaffAsync(id);
        removeStaff(id);
        callback();
      } catch (error) {
        callback(error);
      }
    },
    function(err) {
      if (err) {
        console.error(`Failed to delete staff ${err}`);
      } else {
        console.log('All staff have been successfully deleted!');
      }
    }
  );

  async.each(
    clientIds,
    function(id, callback) {
      try {
        deleteClientAsync(id);
        removeClients(id);
        callback();
      } catch (error) {
        callback(error);
      }
    },
    function(err) {
      if (err) {
        console.error(`Failed to delete client ${err}`);
      } else {
        console.log('All clients have been successfully deleted!');
      }
    }
  );
};
