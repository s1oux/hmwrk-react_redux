import { SET_USER, SET_USER_COUNT } from '../actions/userActionTypes';
import * as userController from '../controllers/userController';

const setUserAction = (user) => ({
  type: SET_USER,
  user: user,
});

const setUsersCountAction = (count) => ({
  type: SET_USER_COUNT,
  count: count,
});

export const getUser = () => (dispatch, getRootState) => {
  const {
    messages: { messages },
  } = getRootState();
  dispatch(setUserAction(userController.selectRandomUser(messages)));
};

export const getUsersCount = () => (dispatch, getRootState) => {
  const {
    messages: { messages },
  } = getRootState();
  dispatch(setUsersCountAction(userController.countUsersInChat(messages)));
};
