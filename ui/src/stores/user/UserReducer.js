import baseReducer from '../../utils/BaseReducer';
import * as UserActions from './UserActions';

export const initialState = {};

const userReducer = baseReducer(initialState, {
  [UserActions.FETCH_USER_FINISHED](state, action) {
    return {
      ...state,
      ...action.payload?.data,
    };
  },
});

export default userReducer;
