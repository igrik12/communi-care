import { action, computed, thunk, actionOn } from 'easy-peasy';
import store from 'store';
import {
  companyExists,
  createNewCompany,
  createNewClient,
  createNewStaff,
  signUpUser,
  deleteCompanyAsync,
  deleteCompanyDependencies,
  deleteStaffAsync,
  deleteClientAsync,
  subscribe,
  updateEntityAsync
} from 'utils/modelHelpers';
import { update } from 'utils/helpers';

import {
  CLIENT,
  STAFF,
  COMPANY,
  ON_DELETE_CLIENT,
  ON_DELETE_COMPANY,
  ON_DELETE_STAFF,
  ON_CREATE_CLIENT,
  ON_CREATE_COMPANY,
  ON_CREATE_STAFF
} from 'utils/constants';

const subscriptions = actions => [
  {
    type: ON_DELETE_CLIENT,
    action: clientData => actions.removeClient(clientData.value.data.onDeleteClient.id)
  },
  {
    type: ON_DELETE_COMPANY,
    action: companyData => actions.removeCompany(companyData.value.data.onDeleteCompany.id)
  },
  {
    type: ON_DELETE_STAFF,
    action: staffData => actions.removeStaff(staffData.value.data.onDeleteStaff.id)
  },
  {
    type: ON_CREATE_CLIENT,
    action: clientData => actions.addClient(clientData.value.data.onCreateClient)
  },
  {
    type: ON_CREATE_STAFF,
    action: staffData => actions.addStaff(staffData.value.data.onCreateStaff)
  },
  {
    type: ON_CREATE_COMPANY,
    action: companyData => actions.addCompany(companyData.value.data.onCreateCompany)
  }
];

const managementModel = {
  subscriptions: [],
  setupSubscription: action((state, payload) => {
    const subs = subscriptions(store.getActions());
    state.subscriptions = subscribe(subs);
  }),
  unsubscribe: action((state, payload) => {
    state.subscriptions.forEach(subscription => subscription.unsubscribe());
  }),
  editOpen: { open: false, type: '', id: '' },
  setEditOpen: action((state, payload) => {
    state.editOpen = payload;
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
  resetFormData: action((state, payload) => {
    state.company = { name: '', companyLogoUrl: '' };
    state.clients = [];
    state.staff = [];
  }),
  submitFormData: thunk(async (actions, payload, { getState, getStoreActions, getStoreState }) => {
    // 1. Check if company exist
    const { company, clients, staff } = getState().formData;
    let newCompany = companyExists(company, getStoreState().companies);
    if (!newCompany) {
      try {
        newCompany = await createNewCompany(company);
      } catch (error) {
        console.error(`Failed to create company ${company.name}`);
        console.error(`Error: ${error}`);
        setAlertOpen({ open: true, success: false, message: 'Failed to create company. Check log for errors' });
        return;
      }
    }

    const companyId = newCompany.id;
    const setAlertOpen = getStoreActions().setAlertOpen;
    try {
      staff.forEach(await createNewStaff(companyId, setAlertOpen));
    } catch (error) {
      console.error(`Failed to create staff. Error: ${JSON.stringify(error)}`);
      setAlertOpen({
        open: true,
        success: false,
        message: 'Failed to create staff. Check log for errors.'
      });
    }

    // Sign up
    try {
      staff.forEach(await signUpUser);
    } catch (error) {
      console.error(`Failed to add user to Cognito. Error: ${JSON.stringify(error)}`);
      setAlertOpen({ open: true, success: false, message: 'Failed to ad user to Cognito. Check log for errors' });
    }

    // 3. Create every client
    try {
      clients.forEach(await createNewClient(companyId));
    } catch (error) {
      console.error(`Failed to create client. Error: ${JSON.stringify(error)}`);
      setAlertOpen({ open: true, success: false, message: 'Failed to create client. Check log for errors' });
    }

    setAlertOpen({ open: true, success: true, message: 'Successfully submitted form' });
  }),
  deleteEntity: thunk(async (actions, payload, { getStoreActions, getStoreState }) => {
    const setAlertOpen = getStoreActions().setAlertOpen;
    const removeStaff = getStoreActions().removeStaff;
    const removeClient = getStoreActions().removeClient;
    try {
      const { type, id, deleteDependencies = false } = payload;
      switch (type) {
        case COMPANY:
          await deleteCompanyAsync(id);
          if (deleteDependencies) {
            const company = getStoreState().companies.find(company => company.id === id);
            deleteCompanyDependencies(company, removeStaff, removeClient);
          }
          getStoreActions().removeCompany(payload);
          setAlertOpen({ open: true, success: true, message: 'Successfully deleted company' });
        case CLIENT:
          await deleteClientAsync(id);
          return;
        case STAFF:
          await deleteStaffAsync(id);
          removeStaff(id);
          return;
        default:
          console.error('Unknown delete type provided');
          return;
      }
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to delete company. Check console for errors' });
      console.error(JSON.stringify(error));
    }
  }),
  updateEntity: thunk(async (actions, payload, { getStoreState, getStoreActions }) => {
    const result = await updateEntityAsync(payload);
    const { staff, clients, companies } = getStoreState();
    switch (payload.type) {
      case STAFF:
        update(staff, result.data.updateStaff.id, result.data.updateStaff);
        getStoreActions().setStaff(staff);
        break;
      case COMPANY:
        update(companies, result.data.updateCompany.id, result.data.updateCompany);
        getStoreActions().setCompanies(companies);
        break;
      case CLIENT:
        update(clients, result.data.updateClient.id, result.data.updateClient);
        getStoreActions().setClients(clients);
        break;
      default:
        break;
    }
  })
};

export default managementModel;
