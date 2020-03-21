import { API, graphqlOperation, Auth } from 'aws-amplify';
import async from 'async';
import {
  createCompany,
  createStaff,
  createClient,
  createResidence,
  createAddress,
  deleteCompany,
  deleteClient,
  deleteStaff,
  updateStaff,
  updateCompany,
  updateClient
} from '../graphql/mutations';

import {
  onDeleteStaff,
  onDeleteClient,
  onDeleteCompany,
  onCreateClient,
  onCreateCompany,
  onCreateStaff
} from 'graphql/subscriptions';
import {
  ON_DELETE_CLIENT,
  ON_DELETE_COMPANY,
  ON_DELETE_STAFF,
  ON_CREATE_CLIENT,
  ON_CREATE_STAFF,
  ON_CREATE_COMPANY,
  STAFF,
  COMPANY,
  CLIENT
} from 'utils/constants';

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const clientDeleteSubscribe = action => {
  const subscription = API.graphql(graphqlOperation(onDeleteClient)).subscribe({
    next: clientData => action(clientData)
  });
  return subscription;
};

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const staffDeleteSubscribe = action => {
  const subscription = API.graphql(graphqlOperation(onDeleteStaff)).subscribe({
    next: staffData => action(staffData)
  });
  return subscription;
};

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const companyDeleteSubscribe = action => {
  const subscription = API.graphql(graphqlOperation(onDeleteCompany)).subscribe({
    next: companyData => action(companyData)
  });
  return subscription;
};

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const companyCreateSubscribe = action => {
  const subscription = API.graphql(graphqlOperation(onCreateCompany)).subscribe({
    next: companyData => action(companyData)
  });
  return subscription;
};

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const clientCreateSubscribe = action => {
  const subscription = API.graphql(graphqlOperation(onCreateClient)).subscribe({
    next: clientData => action(clientData)
  });
  return subscription;
};

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const staffCreateSubscribe = action => {
  const subscription = API.graphql(graphqlOperation(onCreateStaff)).subscribe({
    next: staffData => action(staffData)
  });
  return subscription;
};

export const subscribe = subscriptions => {
  const subs = [];
  subscriptions.forEach(subscription => {
    const { type, action } = subscription;
    switch (type) {
      case ON_DELETE_CLIENT:
        subs.push(clientDeleteSubscribe(action));
        break;
      case ON_DELETE_STAFF:
        subs.push(staffDeleteSubscribe(action));
        break;
      case ON_DELETE_COMPANY:
        subs.push(companyDeleteSubscribe(action));
        break;
      case ON_CREATE_COMPANY:
        subs.push(companyCreateSubscribe(action));
        break;
      case ON_CREATE_CLIENT:
        subs.push(clientCreateSubscribe(action));
        break;
      case ON_CREATE_STAFF:
        subs.push(staffCreateSubscribe(action));
        break;
      default:
        break;
    }
  });
  return subs;
};

// Check if company with name X exists
export const companyExists = (company, allCompanies) => {
  if (!allCompanies.length) return undefined;
  return allCompanies.find(comp => comp.name === company.name);
};

// Create new company
export const createNewCompany = async company => {
  const { name, companyLogoUrl, isActive } = company;
  const details = { input: { name, companyLogoUrl, isActive } };
  const result = await API.graphql(graphqlOperation(createCompany, details));
  return result.data.createCompany;
};

export const createNewStaff = async staffData => {
  const {
    firstName,
    lastName,
    username,
    userType,
    permissions,
    password,
    email,
    phone_number,
    companyId,
    isActive
  } = staffData;
  const details = {
    input: {
      firstName,
      lastName,
      username,
      userType,
      isActive,
      email,
      password,
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

export const createNewClient = async clientData => {
  const { firstName, lastName, dateOfBirth, isActive, companyId, residenceId } = clientData;
  const details = {
    input: { firstName, lastName, dateOfBirth, isActive, clientCompanyId: companyId, clientRecidenceId: residenceId }
  };
  await API.graphql(graphqlOperation(createClient, details));
};

export const createNewResidence = async residence => {
  let result;
  try {
    result = await createNewAddress(residence.address);
  } catch (error) {
    console.error(`Failed to create address. Error: ${JSON.stringify(error)}`);
    throw Error(error);
  }
  const details = { input: { name: residence.name, residenceAddressId: result.data.createAddress.Id } };
  await API.graphql(graphqlOperation(createResidence, details));
};

export const createNewAddress = async address => {
  const details = { input: address };
  const result = await API.graphql(graphqlOperation(createAddress, details));
  return result;
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

export const updateStaffAsync = async staff => {
  const details = { input: { ...staff } };
  return await API.graphql(graphqlOperation(updateStaff, details));
};

export const updateCompanyAsync = async company => {
  const details = { input: { ...company } };
  return await API.graphql(graphqlOperation(updateCompany, details));
};

export const updateClientAsync = async client => {
  const details = { input: { ...client } };
  return await API.graphql(graphqlOperation(updateClient, details));
};

export const updateEntityAsync = async entity => {
  const { type, data } = entity;
  switch (type) {
    case STAFF:
      return await updateStaffAsync(data);
    case COMPANY:
      return await updateCompanyAsync(data);
    case CLIENT:
      return await updateClientAsync(data);
    default:
      break;
  }
};
