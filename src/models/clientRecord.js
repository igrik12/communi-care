import { action, thunk } from 'easy-peasy';
import { createClientRecord, createEntry, updateClientRecord } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { listClients } from '../graphql/queries';

const clientRecordModel = {
  records: [],
  setRecords: action((state, payload) => {
    state.records = payload;
  }),
  selectedRecord: undefined,
  setSelectedRecord: action((state, payload) => {
    state.selectedRecord = payload;
  }),
  addRecord: action((state, payload) => {
    state.records.push(payload);
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
      date: recordDate,
      shift: shift,
      entryType: payload.entryType
    };

    const record = await API.graphql(graphqlOperation(createClientRecord, { input: recordDetails }));
    const entryDetails = {
      entryClientRecordId: record.data.createClientRecord.id,
      ...entry
    };

    const retEntry = await API.graphql(graphqlOperation(createEntry, { input: entryDetails }));
    const recordUpdate = {
      id: record.data.createClientRecord.id,
      clientRecordEntryId: retEntry.data.createEntry.id
    };
    await API.graphql(graphqlOperation(updateClientRecord, { input: recordUpdate }));
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
