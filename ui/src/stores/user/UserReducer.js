import baseReducer from '../../utils/BaseReducer';
import * as UserActions from './UserActions';

export const initialState = {};

const userReducer = baseReducer(initialState, {
  [UserActions.FETCH_USER_FINISHED](state, action) {
    return {
      ...state,
      ...action.payload?.data?.data,
    };
  },
  [UserActions.CHECK_USER_AUTH_FINISHED](state, action) {
    return {
      ...state,
      isAuthenticated: action.payload,
    };
  },
  [UserActions.SET_USER_AUTH_FINISHED](state, action) {
    return {
      ...state,
      isAuthenticated: action.payload,
    };
  },
});

export default userReducer;
