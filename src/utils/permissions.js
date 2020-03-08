const hasPermissions = permissions => ({ userName, userType }, className) => {
  if (userType === 'admin' || userType === 'developer') return true;

  const userFound = permissions.find(perm => perm.username === userName);

  if (!userFound) return false;

  return userFound.permissions.includes(className);
};

const isDeveloper = groups => {
  return groups && groups.includes('developer');
};

module.exports = {
  hasPermissions,
  isDeveloper
};
