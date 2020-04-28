import clientRecordModel from './clientRecord';
import layoutModel from './layout';
import managementModel from './management';
import clientsModel from './clients';
import _ from 'lodash';

import { action, thunk, thunkOn, computed, actionOn } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';
import {
  listCompanysWithStaffAndClients,
  listResidencesWithAddress,
  listClients,
  listStaffs,
} from 'graphql/customQueries';
import { updateStaff } from 'graphql/mutations';

const mainModel = {
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  getUser: thunk(async (actions, { username, userType }) => {
    const filter = { filter: { username: { eq: username } } };
    const ret = await API.graphql(graphqlOperation(listStaffs, filter));
    const staffList = ret.data.listStaffs.items;
    if (staffList.length) {
      const staff = staffList[0];
      if (staff.userType === userType) {
        actions.setUser(staffList[0]);
      } else {
        const updateDetails = { input: { id: staff.id, userType } };
        await API.graphql(graphqlOperation(updateStaff, updateDetails));
      }
    }
  }),
  companyData: computed([(state) => state.companies, (state) => state.user], (companies, user) => {
    const match = companies.find((company) => company.id === user?.company?.id);
    if (match) {
      return {
        id: match.id,
        name: match.name,
        photoUrl: match.photoUrl,
        clients: match.client.items,
        staff: match.staff.items,
      };
    }
    return {
      id: null,
      name: null,
      photoUrl: null,
      clients: [],
      staff: [],
    };
  }),
  userGroups: [],
  setUserGroups: action((state, payload) => {
    state.userGroups = payload;
  }),
  alertOpen: { open: false, success: true, message: null },
  setAlertOpen: action((state, payload) => {
    state.alertOpen = payload;
  }),
  companies: [],
  setCompanies: action((state, payload) => {
    state.companies = payload;
  }),
  addCompany: action((state, payload) => {
    state.companies.push(payload);
  }),
  removeCompany: action((state, payload) => {
    _.remove(state.companies, (comp) => comp.id === payload);
  }),
  updateCompany: action((state, payload) => {
    const updated = state.companies.map((item) => (item.id === payload.id ? payload : item));
    state.companies = updated;
  }),
  fetchCompanies: thunkOn(
    (actions) => actions.fetchAll,
    async (actions, payload, { getState }) => {
      try {
        const ret = await API.graphql(graphqlOperation(listCompanysWithStaffAndClients));
        const companies = ret.data.listCompanys.items;
        actions.setCompanies(companies);
      } catch (error) {
        console.log(error);
      }
    }
  ),
  fetchAll: action(() => {}),
  staff: [],
  setStaff: action((state, payload) => {
    state.staff = payload;
  }),
  addStaff: action((state, payload) => {
    state.staff.push(payload);
  }),
  removeStaff: action((state, payload) => {
    _.remove(state.staff, (staff) => staff.id === payload);
  }),
  updateStaff: action((state, payload) => {
    const updated = state.staff.map((item) => (item.id === payload.id ? payload : item));
    state.staff = updated;
  }),
  updateStaffListener: actionOn(
    (actions) => actions.updateStaff,
    (state, target) => {
      if (state.user.id === target.payload.id) {
        state.user.permissions = target.payload.permissions;
      }
    }
  ),
  fetchStaff: thunkOn(
    (actions) => actions.fetchAll,
    async (actions) => {
      try {
        const ret = await API.graphql(graphqlOperation(listStaffs));
        actions.setStaff(ret.data.listStaffs.items || []);
      } catch (error) {
        console.error(`Failed to retrieve all staff. ${error}`);
      }
    }
  ),
  clients: [],
  setClients: action((state, payload) => {
    state.clients = payload;
  }),
  addClient: action((state, payload) => {
    state.clients.push(payload);
  }),
  removeClient: action((state, payload) => {
    _.remove(state.clients, (client) => client.id === payload);
  }),
  updateClient: action((state, payload) => {
    const updated = state.clients.map((item) => (item.id === payload.id ? payload : item));
    state.clients = updated;
  }),
  fetchClients: thunkOn(
    (actions) => actions.fetchAll,
    async (actions) => {
      try {
        const ret = await API.graphql(graphqlOperation(listClients));
        actions.setClients(ret.data.listClients.items || []);
      } catch (error) {
        console.error(`Failed to retrieve all clients. ${error}`);
      }
    }
  ),
  residences: [],
  setResidences: action((state, payload) => {
    state.residences = payload;
  }),
  addResidence: action((state, payload) => {
    state.residences.push(payload);
  }),
  removeResidence: action((state, payload) => {
    _.remove(state.residences, (residence) => residence.id === payload);
  }),
  updateResidence: action((state, payload) => {
    const updated = state.residences.map((item) => (item.id === payload.id ? payload : item));
    state.residences = updated;
  }),
  fetchResidences: thunkOn(
    (actions) => actions.fetchAll,
    async (actions) => {
      try {
        const ret = await API.graphql(graphqlOperation(listResidencesWithAddress));
        actions.setResidences(ret.data.listResidences.items || []);
      } catch (error) {
        console.error(`Failed to retrieve all residences. ${error}`);
      }
    }
  ),
  permissions: [],
  setPermissions: action((state, payload) => {
    state.permissions = payload;
  }),
  clientRecordModel,
  layoutModel,
  managementModel,
  clientsModel,
};

export default mainModel;
