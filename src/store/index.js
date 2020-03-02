import { createStore } from 'easy-peasy';
import mainModel from '../models';

const store = createStore(mainModel, {
  name: 'communi-care'
});

export default store;
