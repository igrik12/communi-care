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
import * as subscriptions from 'graphql/subscriptions';
import { ON_DELETE_CLIENT, ON_DELETE_COMPANY, ON_DELETE_STAFF } from 'utils/constants';

/**
 *
 * @param {function} action called upon subsription trigger
 * @param {function} unsubscribe callback providing subscription back to the caller
 */
export const clientDeleteSubscribe = (action, unsubscribe) => {
  const subscription = API.graphql(graphqlOperation(subscriptions.onDeleteClient)).subscribe({
    next: clientData => action(clientData)
  });
  unsubscribe(subscription);
};

/**
 *
 * @param {function} action called upon subsription trigger
 * @param {function} unsubscribe callback providing subscription back to the caller
 */
export const staffDeleteSubscribe = (action, unsubscribe) => {
  const subscription = API.graphql(graphqlOperation(subscriptions.onDeleteStaff)).subscribe({
    next: staffData => action(staffData)
  });
  unsubscribe(subscription);
};

/**
 *
 * @param {function} action called upon subsription trigger
 * @param {function} unsubscribe callback providing subscription back to the caller
 */
export const companyDeleteSubscribe = (action, unsubscribe) => {
  const subscription = API.graphql(graphqlOperation(subscriptions.onDeleteCompany)).subscribe({
    next: companyData => action(companyData)
  });
  unsubscribe(subscription);
};

export const subscribe = subscriptions => {
  subscriptions.forEach(subscription => {
    const { type, action, callback } = subscription;
    switch (type) {
      case ON_DELETE_CLIENT:
        clientDeleteSubscribe(action, callback);
        break;
      case ON_DELETE_STAFF:
        staffDeleteSubscribe(action, callback);
        break;
      case ON_DELETE_COMPANY:
        companyDeleteSubscribe(action, callback);
        break;
      default:
        break;
    }
  });
};

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

export const deleteCompanyDependencies = (company, removeStaff, removeClient) => {
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
        removeClient(id);
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
