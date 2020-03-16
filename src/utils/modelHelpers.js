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

export const deleteCompanyDependencies = company => {
  const clientIds = company.client.items.map(client => ({
    input: {
      id: client.id
    }
  }));
  const staffIds = company.staff.items.map(st => ({
    input: {
      id: st.id
    }
  }));
  async.each(clientIds, deleteClient, function(err) {
    console.log(err);
  });
  async.each(staffIds, deleteStaff, function(err) {
    console.log(err);
  });
};
