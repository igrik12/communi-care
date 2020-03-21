import _ from 'lodash';

export const update = (arr, id, newval) => {
  var index = _.findIndex(arr, item => item.id === id);
  arr.splice(index, 1, newval);
};
