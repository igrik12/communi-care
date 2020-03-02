import { action, thunk } from 'easy-peasy';
import { createClientRecord, createEntry } from '../graphql/mutations';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listClients } from '../graphql/queries';

const clientRecordModel = {
  records: [],
  setRecords: action((state, payload) => {
    state.records = payload;
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
    clientId: -1,
    shift: 'not selected',
    entry: {}
  },
  setRecord: action((state, payload) => {
    state.record[payload.fieldId] = payload.value;
  }),
  setEntry: action((state, payload) => {
    state.record.entry[payload.fieldId] = payload.value;
  }),
  saveRecord: thunk(async (actions, payload, { getState }) => {
    const { clientId, shift, recordDate, entry } = getState().record;

    const recordDetails = {
      clientRecordStaffId: 'b1306676-38ac-4ea8-bc82-df58d46050ca',
      date: recordDate,
      clientRecordClientId: clientId,
      shift: shift
    };
    const record = await API.graphql(graphqlOperation(createClientRecord, { input: recordDetails }));
    console.log(record);
    const entryDetails = {
      entryClientRecordId: record.data.createClientRecord.id,
      ...entry
    };
    const retEntry = await API.graphql(graphqlOperation(createEntry, { input: entryDetails }));
    console.log(retEntry);
  }),
  clients: [],
  setClients: action((state, payload) => {
    state.clients = payload;
  }),
  getClients: thunk(async (actions, payload) => {
    const ret = await API.graphql(graphqlOperation(listClients));
    actions.setClients(ret.data.listClients.items);
  })
};

export default clientRecordModel;
