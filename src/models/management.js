import { action, computed, thunk } from 'easy-peasy';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listCompanys } from '../graphql/queries';
import { createCompany, createStaff, createClient } from '../graphql/mutations';

const managementModel = {
  editModeOn: false,
  setEditModeOn: action((state, payload) => {
    state.editModeOn = payload;
  }),
  editType: 'new',
  setEditType: action((state, payload) => {
    state.editType = payload;
  }),
  data: computed(state => {
    const company = state.company;
    const staff = state.staff;
    const clients = state.clients;
    const completeData = { company, staff, clients };
    return completeData;
  }),
  company: { name: '', companyLogoUrl: '' },
  setCompany: action((state, payload) => {
    state.company = payload;
  }),
  companies: [],
  addCompany: action((state, payload) => {
    state.companies.push(payload);
  }),
  setCompanies: action((state, payload) => {
    state.companies = payload;
  }),
  fetchCompanies: thunk(async actions => {
    try {
      const ret = await API.graphql(graphqlOperation(listCompanys));
      actions.setCompanies(ret.data.listCompanys.items);
    } catch (error) {
      console.log(error);
    }
  }),
  staff: [],
  setStaff: action((state, payload) => {
    state.staff = payload;
  }),
  addStaff: action((state, payload) => {
    if (state.staff.some(s => s.username === payload.username)) return;
    state.staff.push(payload);
  }),
  clients: [],
  setClients: action((state, payload) => {
    state.clients = payload;
  }),
  addClient: action((state, payload) => {
    if (state.clients.some(client => client.name === payload.name)) return;
    state.clients.push(payload);
  }),
  formData: computed(state => {
    const company = state.company;
    const clients = state.clients;
    const staff = state.staff;
    return { company, clients, staff };
  }),
  submitFormData: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // 1. Check if company exist
    const { company, clients, staff } = getState().formData;
    let newCompany = companyExists(company, getState().companies);
    if (!newCompany) {
      newCompany = await createNewCompany(company);
      if (newCompany) {
        actions.addCompany(company);
      }
    }

    if (!newCompany) return;

    const companyId = newCompany.id;
    const setAlertOpen = getStoreActions().setAlertOpen;
    // 2. Create every Staff with Company ID

    staff.forEach(await createNewStaff(companyId, setAlertOpen));
    // 3. Create every client
    clients.forEach(await createNewClient(companyId, setAlertOpen));

    setAlertOpen({ open: true, success: true, message: 'Successfully submitted form' });
  })
};

// Check if company with name X exists
const companyExists = (company, allCompanies) => {
  if (!allCompanies.length) return undefined;
  return allCompanies.find(comp => comp.name === company.name);
};

// Create new company
const createNewCompany = async (company, setAlertOpen) => {
  const { name, companyLogoUrl } = company;
  try {
    const details = { input: { name, companyLogoUrl } };
    const result = await API.graphql(graphqlOperation(createCompany, details));
    return result.data.createCompany;
  } catch (error) {
    console.error(`Failed to create company ${name}`);
    console.error(`Error: ${error}`);
    setAlertOpen({ open: true, success: false, message: 'Failed to create company. Check log for errors' });
    return undefined;
  }
};

const createNewStaff = (companyId, setAlertOpen) => async staff => {
  const { username, userType, permissions, password, email, phone_number } = staff;
  let result;
  try {
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
    result = await API.graphql(graphqlOperation(createStaff, details));
  } catch (error) {
    console.error(`Failed to create staff. Error: ${JSON.stringify(error)}`);
    setAlertOpen({
      open: true,
      success: false,
      message: 'Failed to create staff. Check log for errors.'
    });

    return undefined;
  }

  try {
    await Auth.signUp({ username, password, attributes: { email, phone_number } });
    return result.data.createStaff.id;
  } catch (error) {
    console.error(`Failed to add user to Cognito. Error: ${JSON.stringify(error)}`);
    setAlertOpen({ open: true, success: false, message: 'Failed to ad user to Cognito. Check log for errors' });
  }
};

const createNewClient = (companyId, setAlertOpen) => async client => {
  const { name } = client;
  try {
    const details = { input: { name, clientCompanyId: companyId } };
    const result = await API.graphql(graphqlOperation(createClient, details));
    return result.data.createClient.id;
  } catch (error) {
    console.error(`Failed to create client. Error: ${JSON.stringify(error)}`);
    setAlertOpen({ open: true, success: false, message: 'Failed to create client. Check log for errors' });
    return undefined;
  }
};

export default managementModel;
