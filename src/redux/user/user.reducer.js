import UserActionTypes from './user.types';
import { removeLastUser } from './user.utils';

const INITIAL_STATE = [
  {
    name: 'User1',
  },
  {
    name: 'User2',
  },
];

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.ADD_USER:
      return [...state, action.payload];
    case UserActionTypes.REMOVE_LAST_USER:
      return removeLastUser(state);
    default:
      return state;
  }
};

export default userReducer;
