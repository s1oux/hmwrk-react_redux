import {
  SET_MESSAGES,
  ADD_MESSAGE,
  EDIT_MESSAGE,
  REMOVE_MESSAGE,
  SET_LAST_MESSAGE_DATE,
  SET_EDIT_MESSAGE,
} from '../actions/messageActionTypes';

import { getMessagesFromMock, getMessages } from '../services/messageService';
import * as messageController from '../controllers/messageController';

const setMessagesAction = (messages) => ({
  type: SET_MESSAGES,
  messages: messages,
});

const addMessageAction = (message) => ({
  type: ADD_MESSAGE,
  message: message,
});

const editMessageAction = (message) => ({
  type: EDIT_MESSAGE,
  message: message,
});

const removeMessageAction = (message) => ({
  type: REMOVE_MESSAGE,
  message: message,
});

const setLastMessageDateAction = () => ({
  type: SET_LAST_MESSAGE_DATE,
});

const setEditMessageAction = (message) => ({
  type: SET_EDIT_MESSAGE,
  message: message,
});

export const loadMessages = () => async (dispatch) => {
  const fetchedMessages = getMessagesFromMock();
  const processedMessages = messageController.processMessagesInitData(
    fetchedMessages
  );
  dispatch(setMessagesAction(processedMessages));
  dispatch(setLastMessageDateAction());
};

export const addMessage = (messageText) => (dispatch, getRootState) => {
  const {
    user: { user },
  } = getRootState();
  const message = messageController.createMessage(user)(messageText);
  dispatch(addMessageAction(message));
  dispatch(setLastMessageDateAction());
};

export const likeMessage = (id) => (dispatch, getRootState) => {
  const {
    user: { user },
    messages: { messages },
  } = getRootState();
  const mapLikes = (message) => ({
    ...message,
    likes: messageController.isLikedByUser(message, user)
      ? messageController.removeUserLike(message, user)
      : [...message.likes, user.id],
  });
  const updatedMessages = messages.map((message) =>
    message.id !== id ? message : mapLikes(message)
  );
  dispatch(setMessagesAction(updatedMessages));
};

export const removeMessage = (message) => (dispatch) => {
  dispatch(removeMessageAction(message));
  dispatch(setLastMessageDateAction());
};

export const editMessage = (newMessage) => (dispatch) => {
  dispatch(editMessageAction(newMessage));
};

export const toggleEditMessage = (message) => (dispatch) => {
  dispatch(setEditMessageAction(message));
};

export const toggleEditMessageOnKey = () => (dispatch, getRootState) => {
  const {
    user: { user },
    messages: { messages },
  } = getRootState();
  const message = messageController.getLastUserMessage(user, messages);
  dispatch(setEditMessageAction(message));
};
