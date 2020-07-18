import React from 'react';

import './chatHeader.css';

const chatHeader = ({ name, userCount, messageCount, lastMessageTime }) => (
  <div className="chat-header">
    <div className="chat-header__element chat-header__logo">
      <h3>{name}</h3>
    </div>
    <div className="chat-header__element chat-header__counts">
      <span className="chat-header__count">
        <i className="fa fa-user-circle-o" aria-hidden="true"></i> {userCount}
      </span>
      <span className="chat-header__count">
        <i className="fa fa-envelope-o" aria-hidden="true"></i> {messageCount}
      </span>
    </div>
    <div className="chat-header__element chat-header__message-time">
      <span>last message at {lastMessageTime}</span>
    </div>
  </div>
);

export default chatHeader;
