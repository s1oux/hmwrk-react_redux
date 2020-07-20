import React from 'react';

import { groupMessagesByDate } from '../../controllers/messageController';
import Message from '../Message/message';

import './messageList.css';

const messageList = ({
  user,
  messages,
  removeMessage: remove,
  likeMessage: like,
  toggleModal: toggle,
}) => {
  return (
    <div className="message-list">
      {groupMessagesByDate(messages).map((messagesByDate, id) => (
        <div key={id}>
          <div className="divider">{messagesByDate.date}</div>
          {messagesByDate.messages.map((message, id) => (
            <Message
              key={id}
              user={user}
              message={message}
              toggle={toggle}
              remove={remove}
              like={like}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default messageList;
