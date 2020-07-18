import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'stores/rootReducer';

const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching: ', action);
  const result = next(action);
  console.log('next state: ', store.getState());
  console.groupEnd();
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, loggerMiddleware))
);

export default store;
