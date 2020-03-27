export const hasPermissions = ({ permissions }, className) => {
  if (!permissions || !permissions.length) return false;
  return Array.isArray(permissions) && permissions.includes(className);
};
