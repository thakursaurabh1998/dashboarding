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

export const CHECK_USER_AUTH = 'UserActions.CHECK_USER_AUTH';
export const CHECK_USER_AUTH_FINISHED = 'UserActions.CHECK_USER_AUTH_FINISHED';

export function checkUserAuth() {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      CHECK_USER_AUTH,
      UserEffect.checkUserAuth
    );
  };
}

export const SET_USER_AUTH = 'UserActions.SET_USER_AUTH';
export const SET_USER_AUTH_FINISHED = 'UserActions.SET_USER_AUTH_FINISHED';

export function setUserAuth(value) {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      SET_USER_AUTH,
      UserEffect.setUserAuth,
      value
    );
  };
}
