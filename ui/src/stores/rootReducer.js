import { combineReducers } from 'redux';
import userReducer from './user/UserReducer';

const reducerMap = {
  // router: connectRouter(history), // check what's this
  user: userReducer,
};

export default combineReducers(reducerMap);
