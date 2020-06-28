import { combineReducers } from 'redux';
import userReducer from './user/UserReducer';
import createReducer from './create/CreateReducer';

const reducerMap = {
  // router: connectRouter(history), // check what's this
  user: userReducer,
  create: createReducer,
};

export default combineReducers(reducerMap);
