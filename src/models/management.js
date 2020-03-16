import { action, computed, thunk } from 'easy-peasy';
import {
  companyExists,
  createNewCompany,
  createNewClient,
  createNewStaff,
  signUpUser,
  deleteCompanyAsync,
  deleteCompanyDependencies
} from 'utils/modelHelpers';
import { CLIENT, STAFF, COMPANY } from 'utils/constants';

const managementModel = {
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
        newCompany = undefined;
      }
      if (newCompany) {
        getStoreActions().addCompany(company);
      }
    }

    if (!newCompany) return;

    const companyId = newCompany.id;
    const setAlertOpen = getStoreActions().setAlertOpen;
    // 2. Create every Staff with Company ID

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
  delete: thunk(async (actions, payload, { getStoreActions, getStoreState }) => {
    const setAlertOpen = getStoreActions().setAlertOpen;
    try {
      const { type, id, deleteDependencies = false } = payload;
      switch (type) {
        case COMPANY:
          await deleteCompanyAsync(id);
          if (deleteDependencies) {
            const company = getStoreState().companies.find(company => company.id === id);
            deleteCompanyDependencies(company);
          }
          getStoreActions().removeCompany(payload);
          setAlertOpen({ open: true, success: true, message: 'Successfully deleted company' });
        default:
          console.error('Unknown delete type provided');
          return;
      }
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to delete company. Check console for errors' });
      console.error(JSON.stringify(error));
    }
  })
};

export default managementModel;
