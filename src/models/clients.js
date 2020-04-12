import { action, thunkOn } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';

const clientsModel = {
  selectedClient: null,
  setSelectedClient: action((state, payload) => {
    state.selectedClient = payload;
  }),
  fetchRecords: thunkOn(
    (actions) => actions.setSelectedClient,
    async (actions, target) => {
      try {
      } catch (error) {}
    }
  ),
};

export default clientsModel;
