import clientRecordModel from './clientRecord';
import layoutModel from './layout';
import managementModel from './management';

import { action, thunk } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';
import { listStaffs, listPermissions } from '../graphql/queries';
import { updateStaff } from '../graphql/mutations';

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
  alertOpen: { open: false, success: true, message: null },
  setAlertOpen: action((state, payload) => {
    state.alertOpen = payload;
  }),
  userGroups: [],
  setUserGroups: action((state, payload) => {
    state.userGroups = payload;
  }),
  permissions: [],
  setPermissions: action((state, payload) => {
    state.permissions = payload;
  }),
  staff: [],
  setStaff: action((state, payload) => {
    state.staff = payload;
  }),
  fetchStaff: thunk(async (actions, payload) => {
    try {
      const ret = await API.graphql(graphqlOperation(listStaffs));
      actions.setStaff(ret.data.listStaffs.items);
    } catch (error) {
      console.error(`Failed to retrieve all staff. ${error}`);
    }
  }),
  getPermissions: thunk(async (actions, payload) => {
    try {
      const result = await API.graphql(graphqlOperation(listPermissions));
      actions.setPermissions(result.data.listPermissions.items);
    } catch (error) {
      console.error(`Failed to retrieve permissions. Error: ${error}`);
    }
  }),
  clientRecordModel,
  layoutModel,
  managementModel
};

export default mainModel;
