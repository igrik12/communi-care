import { action } from 'easy-peasy';

const clientsModel = {
  selectedClient: null,
  setSelectedClient: action((state, payload) => {
    state.selectedClient = payload;
  }),
};

export default clientsModel;
