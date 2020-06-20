import * as UserEffect from './UserEffect';
import * as ActionUtility from '../../utils/ActionUtility';

export const FETCH_USER = 'UserActions.FETCH_USER';
export const FETCH_USER_FINISHED = 'UserActions.FETCH_USER_FINISHED';

export function getUser() {
  return async (dispatch, getState) => {
    const data = getState();
    await ActionUtility.createThunkEffect(
      dispatch,
      FETCH_USER,
      UserEffect.getUserData,
      data
    );
  };
}
