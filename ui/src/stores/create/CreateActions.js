import * as CreateEffect from './CreateEffect';
import * as ActionUtility from '../../utils/ActionUtility';

export const ADD_COMPONENT = 'CreateActions.ADD_COMPONENT';

export function addComponent(value) {
  return async (dispatch) => {
    dispatch(ActionUtility.createAction(ADD_COMPONENT, value));
  };
}

export const GET_PAGES = 'CreateActions.GET_PAGES';
export const GET_PAGES_FINISHED = 'CreateActions.GET_PAGES_FINISHED';

export function getCreatedPages() {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      GET_PAGES,
      CreateEffect.getCreatedPages
    );
  };
}

export const ADD_PAGE = 'CreateActions.ADD_PAGE';
export const ADD_PAGE_FINISHED = 'CreateActions.ADD_PAGE_FINISHED';

export function addPage(page) {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      ADD_PAGE,
      CreateEffect.addPage,
      page
    );
  };
}

export const EDIT_PAGE = 'CreateActions.EDIT_PAGE';
export const EDIT_PAGE_FINISHED = 'CreateActions.EDIT_PAGE_FINISHED';

export function editPage(page) {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      EDIT_PAGE,
      CreateEffect.editPage,
      page
    );
  };
}

export const REMOVE_PAGE = 'CreateActions.REMOVE_PAGE';
export const REMOVE_PAGE_FINISHED = 'CreateActions.REMOVE_PAGE_FINISHED';

export function removePage(...routes) {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      REMOVE_PAGE,
      CreateEffect.removePage,
      routes
    );
  };
}
