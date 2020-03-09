import clientRecordModel from './clientRecord';
import layoutModel from './layout';
import managementModel from './management';

import { action, thunk } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';
import { listStaffs } from '../graphql/queries';
import { updateStaff } from '../graphql/mutations';

const mainModel = {
  staff: {},
  setStaff: action((state, payload) => {
    state.staff = payload;
  }),
  getStaff: thunk(async (actions, { username, userType }) => {
    const filter = { filter: { userName: { eq: username } } };
    const ret = await API.graphql(graphqlOperation(listStaffs, filter));
    const staffList = ret.data.listStaffs.items;
    if (listStaffs.length) {
      const staff = staffList[0];
      if (staff.userType === userType) {
        actions.setStaff(staffList[0]);
      } else {
        const updateDetails = { input: { id: staff.id, userType } };
        await API.graphql(graphqlOperation(updateStaff, updateDetails));
      }
    }
  }),
  userGroups: [],
  setUserGroups: action((state, payload) => {
    state.userGroups = payload;
  }),
  clientRecordModel,
  layoutModel,
  managementModel
};

export default mainModel;
