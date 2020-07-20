import {
  SET_MESSAGES,
  ADD_MESSAGE,
  EDIT_MESSAGE,
  REMOVE_MESSAGE,
  SET_LAST_MESSAGE_DATE,
  SET_EDIT_MESSAGE,
} from '../actions/messageActionTypes';

export default (state = { loading: true }, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
        loading: false,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case EDIT_MESSAGE:
      const updatedMessages = state.messages.map((message) => {
        if (message.id === action.message.id) {
          message.text = action.message.text;
        }
        return message;
      });
      return {
        ...state,
        messages: [...updatedMessages],
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.message.id
        ),
      };
    case SET_LAST_MESSAGE_DATE:
      return {
        ...state,
        lastMessageDate: state.messages[
          state.messages.length - 1
        ].createdAt.toLocaleDateString(),
      };
    case SET_EDIT_MESSAGE:
      return {
        ...state,
        messageOnEdit: action.message,
      };
    default:
      return state;
  }
};
