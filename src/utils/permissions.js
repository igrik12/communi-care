const hasPermissions = ({ userType, permissions }, className) => {
  if (userType === 'admin' || userType === 'developer') return true;
  return Array.isArray(className) && permissions.includes(className);
};

const isDeveloper = groups => {
  return groups && groups.includes('developer');
};

module.exports = {
  hasPermissions,
  isDeveloper
};
