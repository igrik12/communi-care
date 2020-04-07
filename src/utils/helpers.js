import _ from 'lodash';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const update = (arr, id, newval) => {
  var index = _.findIndex(arr, item => item.id === id);
  arr.splice(index, 1, newval);
};

export const hashPassword = async password => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (hash, password) => {
  return await bcrypt.compare(hash, password);
};

export const hasPermissions = ({ permissions }, className) => {
  if (!permissions || !permissions.length) return false;
  return Array.isArray(permissions) && permissions.includes(className);
};

