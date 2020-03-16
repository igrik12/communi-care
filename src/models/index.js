import clientRecordModel from './clientRecord';
import layoutModel from './layout';
import managementModel from './management';
import _ from 'lodash';

import { action, thunk, thunkOn, computed } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';
import { listStaffs, listPermissions, listClients, getCompany } from 'graphql/queries';
import { listCompanysWithStaffAndClients } from 'graphql/customQueries';
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
    if (listStaffs.length) {
      const staff = staffList[0];
      if (staff.userType === userType) {
        actions.setUser(staffList[0]);
      } else {
        const updateDetails = { input: { id: staff.id, userType } };
        await API.graphql(graphqlOperation(updateStaff, updateDetails));
      }
    }
  }),
  companyData: computed(state => {
    const user = state.user;
    const companies = state.companies;
    const id = _.get(user, 'company.id');
    if (id) {
      const company = companies.find(company => company.id === id);
      return { company };
    }
    return {};
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
  addCompany: action((state, payload) => {
    state.companies.push(payload);
  }),
  removeCompany: action((state, payload) => {
    _.remove(state.companies, comp => comp.id === payload);
  }),
  setCompanies: action((state, payload) => {
    state.companies = payload;
  }),
  fetchCompanies: thunkOn(
    actions => actions.fetchAll,
    async actions => {
      try {
        const ret = await API.graphql(graphqlOperation(listCompanysWithStaffAndClients));
        actions.setCompanies(ret.data.listCompanys.items);
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
  fetchStaff: thunkOn(
    actions => actions.fetchAll,
    async actions => {
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
  fetchClients: thunkOn(
    actions => actions.fetchAll,
    async actions => {
      try {
        const ret = await API.graphql(graphqlOperation(listClients));
        actions.setClients(ret.data.listClients.items || []);
      } catch (error) {
        console.error(`Failed to retrieve all clients. ${error}`);
      }
    }
  ),
  getPermissions: thunkOn(
    actions => actions.fetchAll,
    async actions => {
      try {
        const result = await API.graphql(graphqlOperation(listPermissions));
        actions.setPermissions(result.data.listPermissions.items);
      } catch (error) {
        console.error(`Failed to retrieve permissions. Error: ${error}`);
      }
    }
  ),
  permissions: [],
  setPermissions: action((state, payload) => {
    state.permissions = payload;
  }),
  clientRecordModel,
  layoutModel,
  managementModel
};

export default mainModel;
