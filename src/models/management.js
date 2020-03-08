import { action, thunk, computed } from 'easy-peasy';

const managementModel = {
  editModeOn: false,
  setEditModeOn: action((state, payload) => {
    state.editModeOn = payload;
  })
};

export default managementModel;
