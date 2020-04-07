import { action, thunk } from 'easy-peasy';
import { createClientRecord, updateClientRecord } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { listClients } from '../graphql/queries';
import _ from 'lodash';

const clientRecordModel = {
  records: [],
  setRecords: action((state, payload) => {
    state.records = payload;
  }),
  selectedRecord: undefined,
  setSelectedRecord: action((state, payload) => {
    state.selectedRecord = payload;
  }),
  createRecord: thunk(async (actions, payload, { getStoreState, getStoreActions }) => {
    const setAlertOpen = getStoreActions().setAlertOpen;
    const recordDetails = {
      clientRecordStaffId: getStoreState().user.id,
      ...payload
    };

    try {
      await API.graphql(graphqlOperation(createClientRecord, { input: recordDetails }));
      setAlertOpen({ open: true, success: true, message: 'Successfully created record!' });
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to create client record' });
      console.error(error);
    }
  }),
  updateRecord: thunk(async (actions, payload, { getStoreActions }) => {
    const setAlertOpen = getStoreActions().setAlertOpen;
    const updateDetails = {
      input: payload
    };
    try {
      await API.graphql(graphqlOperation(updateClientRecord, updateDetails));
      setAlertOpen({ open: true, success: true, message: 'Successfully updated record!' });
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to create client record' });
      console.error(error);
    }
  }),
  clients: [],
  setClients: action((state, payload) => {
    state.clients = payload;
  }),
  getClients: thunk(async actions => {
    const ret = await API.graphql(graphqlOperation(listClients));
    actions.setClients(ret.data.listClients.items);
  })
};

export default clientRecordModel;
