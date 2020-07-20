import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import messageReducer from './reducers/messageReducer';
import userReducer from './reducers/userReducer';

const initialState = {

};

const middlewares = [thunk];

const composedEnhancers = compose(
  composeWithDevTools(applyMiddleware(...middlewares))
);

const reducers = {
  user: userReducer,
  messages: messageReducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
