import { action, thunk, computed } from 'easy-peasy';
import { createClientRecord, createEntry } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { listClients } from '../graphql/queries';

const clientRecordModel = {
  records: [],
  setRecords: action((state, payload) => {
    state.records = payload;
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
  createRecord: thunk(async (actions, payload, { getState, getStoreState, getStoreActions }) => {
    const { clientId, shift, recordDate, entry } = getState().record;
    const setAlertOpen = getStoreActions().setAlertOpen;

    let retEntry;
    try {
      retEntry = await API.graphql(graphqlOperation(createEntry, { input: entry }));
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to create entry' });
      console.error(error);
      return;
    }

    const recordDetails = {
      clientRecordStaffId: getStoreState().staff.id,
      clientRecordEntryId: retEntry.data.createEntry.id,
      clientRecordClientId: clientId,
      createdAt: recordDate,
      shift: shift,
      entryType: payload.entryType
    };

    try {
      await API.graphql(graphqlOperation(createClientRecord, { input: recordDetails }));
      setAlertOpen({ open: true, success: true, message: 'Successfully created record!' });
    } catch (error) {
      setAlertOpen({ open: true, success: false, message: 'Failed to create client record' });
      console.error(error);
    } finally {
      actions.resetRecord();
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
