const hasPermissions = permissions => ({ userName, userType }, className) => {
  if (userType === 'admin') return true;

  const userFound = permissions.find(perm => perm.username === userName);

  if (!userFound) return false;

  return userFound.permissions.includes(className);
};

module.exports = {
  hasPermissions
};
