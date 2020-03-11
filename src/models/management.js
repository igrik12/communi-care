import { action, computed, thunk, actionOn } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';
import { listCompanys } from '../graphql/queries';

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
  setCompanies: action((state, payload) => {
    state.companies = payload;
  }),
  getCompanies: thunk(async (actions, payload) => {
    const ret = await API.graphql(graphqlOperation(listCompanys));
    actions.setCompanies(ret.data.listCompanys.items);
  }),
  staff: [],
  setStaff: action((state, payload) => {
    state.staff = payload;
  }),
  addStaff: action((state, payload) => {
    if (state.staff.some(s => s.userName === payload.userName)) return;
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
  })
};

export default managementModel;
