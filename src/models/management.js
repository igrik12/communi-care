import { action, computed, thunk, memo } from 'easy-peasy';
import store from 'store';
import {
  createNewCompany,
  createNewClient,
  createNewStaff,
  createNewResidence,
  signUpUser,
  deleteCompanyAsync,
  deleteCompanyDependencies,
  deleteStaffAsync,
  deleteClientAsync,
  deleteResidenceAsync,
  subscribeManagement,
  updateEntityAsync
} from 'utils/modelHelpers';

import { subscriptions } from 'utils/subscriptions';
import { update } from 'utils/helpers';
import { CLIENT, STAFF, COMPANY, RESIDENCE } from 'utils/constants';

const memoisedSubscriptions = memo(subscriptions, 2);

const managementModel = {
  subscriptions: [],
  setupSubscription: action((state, payload) => {
    const subs = memoisedSubscriptions(store.getActions());
    state.subscriptions = subscribeManagement(subs);
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
  company: { name: '', photoUrl: '' },
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
    state.company = { name: '', photoUrl: '' };
    state.clients = [];
    state.staff = [];
  }),
  submitEntity: thunk(async (actions, payload, { getStoreActions }) => {
    const { type, data } = payload;
    const setAlertOpen = getStoreActions().setAlertOpen;

    switch (type) {
      case COMPANY:
        try {
          await createNewCompany(data);
          setAlertOpen({ open: true, success: true, message: `Successfully created company ${data.name}` });
          break;
        } catch (error) {
          console.error(`Failed to create company ${data.name}`);
          console.error(`Error: ${error}`);
          setAlertOpen({ open: true, success: false, message: 'Failed to create company. Check log for errors' });
          break;
        }
      case STAFF:
        try {
          await createNewStaff(data);
        } catch (error) {
          console.error(`Failed to create staff ${data.firstName}. Error: ${JSON.stringify(error)}`);
          setAlertOpen({
            open: true,
            success: false,
            message: 'Failed to create staff. Check log for errors.'
          });
          break;
        }
        try {
          await signUpUser(data);
          setAlertOpen({ open: true, success: true, message: `Successfully created staff ${data.firstName}` });
          break;
        } catch (error) {
          console.error(`Failed to add user to Cognito. Error: ${JSON.stringify(error)}`);
          setAlertOpen({ open: true, success: false, message: 'Failed to ad user to Cognito. Check log for errors' });
          break;
        }
      case CLIENT:
        try {
          await createNewClient(data);
          setAlertOpen({ open: true, success: true, message: `Successfully created client ${data.firstName}` });
          break;
        } catch (error) {
          console.error(`Failed to create client ${data.firstName}. Error: ${JSON.stringify(error)}`);
          setAlertOpen({
            open: true,
            success: false,
            message: 'Failed to create client. Check log for errors.'
          });
          break;
        }
      case RESIDENCE:
        try {
          await createNewResidence(data);
          setAlertOpen({ open: true, success: true, message: `Successfully created residence ${data.name}` });
          break;
        } catch (error) {
          console.error(`Failed to create client ${data.firstName}. Error: ${JSON.stringify(error)}`);
          setAlertOpen({
            open: true,
            success: false,
            message: 'Failed to create residence. Check log for errors.'
          });
          break;
        }
      default:
        break;
    }
  }),
  deleteEntity: thunk(async (actions, payload, { getStoreActions, getStoreState }) => {
    const setAlertOpen = getStoreActions().setAlertOpen;
    const removeStaff = getStoreActions().removeStaff;
    const removeClient = getStoreActions().removeClient;
    const removeResidence = getStoreActions().removeResidence;
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
          break;
        case CLIENT:
          await deleteClientAsync(id);
          break;
        case STAFF:
          await deleteStaffAsync(id);
          removeStaff(id);
          break;
        case RESIDENCE:
          await deleteResidenceAsync(id);
          removeResidence(id);
          break;
        default:
          console.error('Unknown delete type provided');
          break;
      }
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to delete company. Check console for errors' });
      console.error(JSON.stringify(error));
    }
  }),
  updateEntity: thunk(async (actions, payload, { getStoreState, getStoreActions }) => {
    const result = await updateEntityAsync(payload);
    const { staff, clients, companies, residences } = getStoreState();
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
      case RESIDENCE:
        update(residences, result.data.updateResidence.id, result.data.updateResidence);
        getStoreActions().setResidences(residences);
        break;
      default:
        break;
    }
  })
};

export default managementModel;
