const hasPermissions = ({ userType, permissions }, className) => {
  console.log(userType)
  console.log(permissions)
  if (userType === 'admin' || userType === 'developer') return true;
  return permissions.includes(className);
};

const isDeveloper = groups => {
  return groups && groups.includes('developer');
};

module.exports = {
  hasPermissions,
  isDeveloper
};
