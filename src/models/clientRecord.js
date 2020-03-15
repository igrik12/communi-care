import { action, thunk, computed } from 'easy-peasy';
import { createClientRecord, createEntry, updateClientRecord } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { listClients } from '../graphql/queries';

const clientRecordModel = {
  records: [],
  setRecords: action((state, payload) => {
    state.records = payload;
  }),
  alertOpen: { open: false, success: true, message: null },
  setAlertOpen: action((state, payload) => {
    state.alertOpen = payload;
  }),
  saveRecordDisabled: computed(state => {
    return (
      !state.record.clientId ||
      !state.record.shift ||
      Object.keys(state.record.entry).length < 9 ||
      Object.values(state.record.entry).some(entry => !entry)
    );
  }),
  selectedRecord: undefined,
  setSelectedRecord: action((state, payload) => {
    state.selectedRecord = payload;
  }),
  entries: [],
  setEntries: action((state, payload) => {
    state.entries = payload;
  }),
  record: {
    recordDate: new Date(),
    clientId: '',
    shift: '',
    entry: {}
  },
  resetRecord: action((state, payload) => {
    state.record.recordDate = new Date();
    state.record.clientId = '';
    state.record.shift = '';
    state.record.entry = {};
  }),
  setRecord: action((state, payload) => {
    state.record[payload.fieldId] = payload.value;
  }),
  setEntry: action((state, payload) => {
    state.record.entry[payload.fieldId] = payload.value;
  }),
  saveRecord: thunk(async (actions, payload, { getState, getStoreState }) => {
    const { clientId, shift, recordDate, entry } = getState().record;

    const recordDetails = {
      clientRecordStaffId: getStoreState().staff.id,
      clientRecordClientId: clientId,
      createdAt: recordDate,
      shift: shift,
      entryType: payload.entryType
    };
    let record;
    try {
      record = await API.graphql(graphqlOperation(createClientRecord, { input: recordDetails }));
    } catch (error) {
      actions.setAlertOpen({ open: true, success: false, message: 'Failed to create client record' });
      console.error(error);
      return;
    }

    const entryDetails = {
      entryClientRecordId: record.data.createClientRecord.id,
      ...entry
    };
    let retEntry;

    try {
      retEntry = await API.graphql(graphqlOperation(createEntry, { input: entryDetails }));
    } catch (error) {
      actions.setAlertOpen({ open: true, success: false, message: 'Failed to create entry' });
      console.error(error);
      return;
    }

    const recordUpdate = {
      id: record.data.createClientRecord.id,
      clientRecordEntryId: retEntry.data.createEntry.id
    };
    try {
      await API.graphql(graphqlOperation(updateClientRecord, { input: recordUpdate }));
      actions.resetRecord();
      actions.setAlertOpen({ open: true, success: true, message: 'Successfully created record!' });
    } catch (error) {
      actions.setAlertOpen({ open: true, success: false, message: 'Failed to update client record' });
      console.error(error);
      return;
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
