import _ from 'lodash';
import { Storage } from 'aws-amplify';
import bcrypt from 'bcryptjs';
import Chartist from 'chartist';

const saltRounds = 10;
const delays = 80,
  durations = 500;

/**
 *
 * @param {Array} arr Collection of items to be updated
 * @param {Number} id  Index of the item to be updated
 * @param {*} newval New value to replace the indexed
 */
export const update = (arr, id, newval) => {
  var index = _.findIndex(arr, (item) => item.id === id);
  arr.splice(index, 1, newval);
};

/**
 *
 * @param {String} password to be hashed using bcrypt library
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

/**
 *
 * @param {String} hash value to be checked against
 * @param {*} password the password to check against the has value
 */
export const comparePassword = async (hash, password) => {
  return await bcrypt.compare(hash, password);
};

/**
 *
 * @param {Array[string]} list of persmissions
 * @param {String} permissionName Permission name to be checked for
 */
export const hasPermissions = ({ permissions }, permissionName) => {
  if (!permissions || !permissions.length) return false;
  return Array.isArray(permissions) && permissions.includes(permissionName);
};

// Replacement for the omit function from lodash due to it being
// removed in the following updates of lodash. Current omit is
// causing huge perfomance issues
/**
 *
 * @param {Object} originalObject the object where we want to omit kvps
 * @param {Array[String]} keysToOmit List of keys to indicate which kvps to omit
 */
export const omit = (originalObject = {}, keysToOmit = []) => {
  const clonedObject = { ...originalObject };

  keysToOmit.forEach((path) => _.unset(clonedObject, path));
  return clonedObject;
};

/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
export const difference = (origObj, newObj) => {
  function changes(newObj, origObj) {
    let arrayIndexCounter = 0;
    return _.transform(newObj, function (result, value, key) {
      if (!_.isEqual(value, origObj[key])) {
        let resultKey = _.isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] = _.isObject(value) && _.isObject(origObj[key]) ? changes(value, origObj[key]) : value;
      }
    });
  }
  return changes(newObj, origObj);
};

// Soon will be depricated by the omitBy from lodash lib
// Kept here in case the new version stops working
export const differenceBetweenObjects = (left, right) => {
  return _.omitBy(left, function (v, k) {
    return right[k] === v;
  });
};

export const uploadPhoto = async (newFile, oldFile) => {
  if (oldFile) {
    try {
      await Storage.remove(oldFile);
    } catch (error) {
      console.log(`Failed to remove photo ${oldFile}. Error: ${error}`);
    }
  }
  try {
    await Storage.put(newFile.name, newFile);
  } catch (error) {
    console.log(`Failed to add photo ${newFile.name}. Error: ${error}`);
  }
};

export const generateChartsData = (typeData) => {
  const returnValue = {
    data: {
      labels: _.keys(typeData),
      series: [_.values(typeData)],
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 20,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      draw: function (data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };
  return returnValue;
};
