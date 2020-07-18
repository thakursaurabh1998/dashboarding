import { combineReducers } from 'redux';

import userReducer from 'stores/user/UserReducer';
import createReducer from 'stores/create/CreateReducer';

const reducerMap = {
  // router: connectRouter(history), // check what's this
  user: userReducer,
  create: createReducer,
};

export default combineReducers(reducerMap);
