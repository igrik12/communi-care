import { action, thunk, computed, debug } from 'easy-peasy';

const managementModel = {
  editModeOn: false,
  setEditModeOn: action((state, payload) => {
    state.editModeOn = payload;
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
    if (payload.name) {
      state.company.name = payload.name;
    }
    if (payload.companyLogoUrl) {
      state.company.companyLogoUrl = payload.companyLogoUrl;
    }
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
  })
};

export default managementModel;
