import _ from 'lodash';

export const update = (arr, id, newval) => {
  // var match = _.find(arr, item => item.id === id);

  var index = _.findIndex(arr, item => item.id === id);
  // Replace item at index using native splice
  arr.splice(index, 1, newval);
  // console.log(match);
  // if (match) {
  //   var index = _.indexOf(
  //     arr,
  //     _.find(arr, item => item.id === id)
  //   );
  //   return arr.splice(index, 1, newval);
  // }
};
