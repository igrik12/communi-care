import { action, thunk } from 'easy-peasy';
import { createClientRecord, updateClientRecord, createClientRecordArchived } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { listClients, getClientRecord } from '../graphql/queries';
import { omit } from 'utils/helpers';
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
      updatedBy: getStoreState().user.id,
      ...payload,
    };

    try {
      await API.graphql(graphqlOperation(createClientRecord, { input: recordDetails }));
      setAlertOpen({ open: true, success: true, message: 'Successfully created record!' });
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to create client record' });
      console.error(error);
    }
  }),
  updateRecord: thunk(async (actions, payload, { getStoreActions, getState }) => {
    const setAlertOpen = getStoreActions().setAlertOpen;
    const selectedRecord = getState().selectedRecord;
    const updateDetails = {
      input: payload,
    };

    const archiveDetails = {
      input: {
        ...omit(selectedRecord, ['version', 'client', 'staff', 'id']),
        updatedBy: payload.updatedBy,
        clientRecordArchivedClientId: selectedRecord.client.id,
        clientRecordArchivedStaffId: selectedRecord.staff.id,
        clientRecordArchivedMainRecordId: selectedRecord.id,
      },
    };
    try {
      await API.graphql(graphqlOperation(updateClientRecord, updateDetails));
      await API.graphql(graphqlOperation(createClientRecordArchived, archiveDetails));
      setAlertOpen({ open: true, success: true, message: 'Successfully updated record!' });
    } catch (error) {
      if (JSON.stringify(error?.errors[0]?.errorType === 'DynamoDB:ConditionalCheckFailedException')) {
        try {
          const getDetails = { id: selectedRecord.id };
          const originalData = await API.graphql(graphqlOperation(getClientRecord, getDetails));
          actions.openMergeWindow({
            mergeData: updateDetails.input,
            originalData: originalData.data.getClientRecord,
            open: true,
          });
        } catch (error) {
          console.error('Error', JSON.stringify(error));
          setAlertOpen({ open: true, success: false, message: 'Failed to updated client record' });
        }
      }
      setAlertOpen({ open: true, success: false, message: 'Failed to updated client record' });
      console.error(error);
    }
  }),
  clients: [],
  setClients: action((state, payload) => {
    state.clients = payload;
  }),
  getClients: thunk(async (actions) => {
    const ret = await API.graphql(graphqlOperation(listClients));
    actions.setClients(ret.data.listClients.items);
  }),
  mergeItem: {},
  setMergeItem: action((state, payload) => {
    const { versionType, fieldId, value, checked } = payload;
    state.mergeItem[fieldId] = { versionType, value, checked };
  }),
  mergeWindow: {
    open: false,
    originalData: null,
    mergeData: null,
  },
  openMergeWindow: action((state, payload) => {
    state.mergeWindow = payload;
  }),
};

export default clientRecordModel;
