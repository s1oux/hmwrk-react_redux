import { SET_USER, SET_USER_COUNT } from '../actions/userActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_USER_COUNT:
      return {
        ...state,
        usersInChat: action.count,
      };
    default:
      return state;
  }
};
