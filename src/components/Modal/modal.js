import React, { useState } from 'react';

import './modal.css';

const Modal = ({ toggleModal, editMessage, messageToEdit }) => {
  const [text, setText] = useState(messageToEdit.text);
  const [isTextValid, setIsTextValid] = useState(true);

  const textChanged = (text) => {
    setText(text);
    setIsTextValid(Boolean(text));
  };

  const clearForm = () => {
    setText('');
  };

  const handleEditCLick = () => {
    const isValid = Boolean(text) && isTextValid;
    if (!isValid) {
      return;
    }
    editMessage(messageToEdit.id, text);
    clearForm();
    toggleModal();
  };

  return (
    <div className="modal-layer">
      <div className="modal-root">
        <div className="modal-header">
          <span>Edit Message</span>
          <div className="close-btn" onClick={() => toggleModal()}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <div className="modal-body">
          <div className="edit-form">
            <textarea
              placeholder="Enter new message text here.."
              type="text"
              className="edit-input"
              value={text}
              onChange={(event) => textChanged(event.target.value)}
            />
            <button className="edit-btn" onClick={handleEditCLick}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
