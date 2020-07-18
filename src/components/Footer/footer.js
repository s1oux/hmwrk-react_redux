import React from 'react';

import './footer.css';

const footer = () => (
  <div className="chat-footer">
    Copyright &copy; BSA-{new Date().getFullYear()}
  </div>
);

export default footer;
