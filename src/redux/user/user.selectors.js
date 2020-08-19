import { createSelector } from 'reselect';

const selectUsers = (state) => state.users;

export const selectUserNames = createSelector([selectUsers], (users) =>
  users.map((user) => user.name)
);
