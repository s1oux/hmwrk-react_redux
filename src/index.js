import React from 'react';
import { render } from 'react-dom';

import Chat from './containers/Chat/chat';
import * as serviceWorker from './serviceWorker';
import './styles/common.css';
import './styles/reset.css';

const target = document.getElementById('root');
render(<Chat />, target);

serviceWorker.unregister();
