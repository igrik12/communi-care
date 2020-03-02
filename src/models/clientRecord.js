import { action, thunk } from 'easy-peasy';
import { createClientRecord, createEntry } from '../graphql/mutations';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listClients } from '../graphql/queries';

const clientRecordModel = {
  records: [],
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
    // const recordDetails = {
    //   staffId: Auth.user.username,
    //   date: recordDate,
    //   clientId: clientId,
    //   shift: shift
    // };
    // const record = await API.graphql(graphqlOperation(createClientRecord, { input: recordDetails }));
    const entryDetails = {
      entryClientRecordId: '7653e45e-6d0f-4e35-a186-18633edfa625',
      ...entry
    };
    const retEntry = await API.graphql(graphqlOperation(createEntry, { input: entryDetails }));
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
