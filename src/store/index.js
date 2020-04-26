import { createStore, action } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import mainModel from '../models';

let initialState = {};

const history = createBrowserHistory();

const router = {
  history: history,
  route: action((state, payload) => {
    state.location = payload.location;
    state.action = payload.action;
  }),
};

const store = createStore(
  { ...mainModel, reset: action((state, payload) => ({ ...initialState })), router },
  {
    name: 'communi-care',
  }
);

initialState = store.getState();

export default store;
