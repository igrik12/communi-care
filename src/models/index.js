import clientRecordModel from './clientRecord';
import layoutModel from './layout';
import managementModel from './management';

import { action, thunk } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';
import { listStaffs } from '../graphql/queries';

const mainModel = {
  staff: {},
  setStaff: action((state, payload) => {
    state.staff = payload;
  }),
  getStaff: thunk(async (actions, payload) => {
    const filter = { filter: { userName: { eq: payload } } };
    const ret = await API.graphql(graphqlOperation(listStaffs, filter));
    const staffList = ret.data.listStaffs.items;
    if (listStaffs.length) {
      actions.setStaff(staffList[0]);
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
