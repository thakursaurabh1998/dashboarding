import { combineReducers } from 'redux';

import { VALIDATE_AUTHENTICATION } from '../actions';

const authentication = (state = {}, action) => {
  const { isAuthenticated } = action;
  switch (action.type) {
    case VALIDATE_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated,
      };
    default:
      return state;
  }
};

export default combineReducers({
  authentication,
});
