import React, { useState, useEffect } from 'react';

import { getMessages } from '../../services/messageService';
import Spinner from '../../components/Spinner/spinner';
import Header from '../../components/Header/header';
import ChatHeader from '../../components/ChatHeader/chatHeader';
import MessageList from '../../components/MessageList/messageList';
import MessageForm from '../../components/MessageForm/messageForm';
import Modal from '../../components/Modal/modal';
import Footer from '../../components/Footer/footer';

import {
  createMessage,
  updateMessage,
  deleteMessage,
  getLastMessageDate,
  processMessagesInitData,
  isLikedByUser,
  removeUserLike,
} from '../../controllers/messageController';

import {
  selectRandomUser,
  countUsersInChat,
} from '../../controllers/userController';

import './chat.css';

const Chat = () => {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSentMessageDate, setLastSentMessage] = useState(new Date(0));
  const [modalOn, setModal] = useState(false);
  const [messageOnEdit, setMessageOnEdit] = useState({});

  useEffect(() => {
    getMessages().then((fetchedData) => {
      const processedMessages = processMessagesInitData(fetchedData);
      setIsLoading(false);
      setMessages(processedMessages);
      setUser(selectRandomUser(processedMessages));
      setLastSentMessage(getLastMessageDate(processedMessages));
    });
  }, []);

  const addMessage = (messageText) => {
    const message = createMessage(user)(messageText);
    setLastSentMessage(message.createdAt);
    setMessages([...messages, message]);
  };

  const likeMessage = (id) => {
    setMessages([
      ...messages.map((message) => {
        if (message.id === id) {
          if (isLikedByUser(message, user)) {
            message.likes = removeUserLike(message, user);
          } else {
            message.likes.push(user.id);
          }
        }
        return message;
      }),
    ]);
  };

  const removeMessage = (id) => setMessages([...deleteMessage(messages)(id)]);

  const toggleModal = (message = {}) => {
    setMessageOnEdit(message);
    setModal(!modalOn);
  };

  const editMessage = (id, newMessage) =>
    setMessages([...updateMessage(messages)(id, newMessage)]);

  return (
    <div className="page">
      {modalOn ? (
        <Modal
          toggleModal={toggleModal}
          messageToEdit={messageOnEdit}
          editMessage={editMessage}
        />
      ) : (
        ''
      )}
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <ChatHeader
            name="ch4tik"
            userCount={countUsersInChat(messages)}
            messageCount={messages.length}
            lastMessageTime={lastSentMessageDate.toLocaleTimeString()}
          />
          <MessageList
            user={user}
            messages={messages}
            removeMessage={removeMessage}
            toggleModal={toggleModal}
            likeMessage={likeMessage}
          />
          <MessageForm addMessage={addMessage} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Chat;
