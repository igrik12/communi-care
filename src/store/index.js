import { createStore, action } from 'easy-peasy';
import mainModel from '../models';

let initialState = {};

const store = createStore(
  { ...mainModel, reset: action((state, payload) => ({ ...initialState })) },
  {
    name: 'communi-care'
  }
);

initialState = store.getState();

export default store;
