import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/spinner';
import Header from '../../components/Header/header';
import ChatHeader from '../../components/ChatHeader/chatHeader';
import MessageList from '../../components/MessageList/messageList';
import MessageForm from '../../components/MessageForm/messageForm';
import Modal from '../../components/Modal/modal';
import Footer from '../../components/Footer/footer';

import {
  loadMessages,
  addMessage,
  likeMessage,
  removeMessage,
  editMessage,
  toggleEditMessage,
  toggleEditMessageOnKey,
} from '../../actions/messageActions';

import { getUser, getUsersCount } from '../../actions/userActions';

import './chat.css';

const Chat = ({
  user,
  usersCount,
  isLoading,
  messages,
  lastMessageDate,
  messageOnEdit,
  loadMessages,
  addMessage,
  likeMessage,
  removeMessage,
  editMessage,
  toggleEditMessage,
  toggleEditMessageOnKey,
  getUser,
  getUsersCount,
}) => {
  useEffect(() => {
    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'ArrowUp') {
          toggleEditMessageOnKey();
        }
      },
      false
    );
    loadMessages();
    getUser();
    getUsersCount();
  }, []);

  return (
    <div className="page">
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <ChatHeader
            name="ch4tik"
            userCount={usersCount}
            messageCount={messages.length}
            lastMessageTime={lastMessageDate}
          />
          <MessageList
            user={user}
            messages={messages}
            removeMessage={removeMessage}
            toggleModal={toggleEditMessage}
            likeMessage={likeMessage}
          />
          <MessageForm addMessage={addMessage} />
          {messageOnEdit && (
            <Modal
              toggle={toggleEditMessage}
              messageToEdit={messageOnEdit}
              editMessage={editMessage}
            />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

Chat.defaultProps = {
  messages: [],
  messageOnEdit: undefined,
  isLoading: true,
};

const mapStateToProps = (rootState) => ({
  user: rootState.user.user,
  usersCount: rootState.user.usersInChat,
  isLoading: rootState.messages.loading,
  messages: rootState.messages.messages,
  lastMessageDate: rootState.messages.lastMessageDate,
  messageOnEdit: rootState.messages.messageOnEdit,
});

const actions = {
  getUser,
  getUsersCount,
  loadMessages,
  addMessage,
  likeMessage,
  removeMessage,
  editMessage,
  toggleEditMessage,
  toggleEditMessageOnKey,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
