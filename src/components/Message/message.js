import React from 'react';

import { getUserImgLink } from '../../helpers/imageHelper';
import { isLikedByUser } from '../../controllers/messageController';
import { isCurrentUserMessage } from '../../controllers/userController';

import './message.css';

const message = ({ user, message, remove, toggleModal, like }) => {
  const isOwnMessage = isCurrentUserMessage(user, message);
  const classes = ['message'];
  const actionClasses = ['message__action', 'message__action-like'];
  actionClasses.push(isLikedByUser(message, user) ? 'liked' : '');
  classes.push(isOwnMessage ? 'ownMessage' : '');

  const actions = isOwnMessage ? (
    <div className="message__actions">
      <div
        className="message__action message__action-ctrl"
        onClick={() => toggleModal(message)}
      >
        edit
      </div>
      <div
        className="message__action message__action-ctrl"
        onClick={() => remove(message.id)}
      >
        remove
      </div>
    </div>
  ) : (
    <div className="message__actions">
      <div onClick={() => like(message.id)} className={actionClasses.join(' ')}>
        {message.likes.length}{' '}
        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
      </div>
    </div>
  );

  return (
    <div className={classes.join(' ')}>
      {isOwnMessage ? (
        ''
      ) : (
        <div className="message__avatar">
          <div className="shadow"></div>
          <img
            className="avatar"
            src={getUserImgLink(message.avatar)}
            alt="avatar"
          />
        </div>
      )}
      <div className="message__content">
        <div className="message__meta-data">
          <span className="message__date">
            {message.createdAt.toLocaleTimeString()}
          </span>
          <span className="message__author">
            {isOwnMessage ? 'me' : message.user}
          </span>
        </div>
        <div className="message__text">{message.text}</div>
        {actions}
      </div>
    </div>
  );
};

export default message;
