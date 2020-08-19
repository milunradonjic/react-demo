export const removeLastUser = (users) => {
  users.splice(-1, 1);
  return [...users];
};
