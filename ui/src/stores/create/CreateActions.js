import * as ActionUtility from 'utils/ActionUtility';
import * as CreateEffect from 'stores/create/CreateEffect';

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

export const UPDATE_ACTIVE_PAGE = 'CreateActions.UPDATE_ACTIVE_PAGE';

export function updateActivePage(key) {
  return async (dispatch) => {
    dispatch(ActionUtility.createAction(UPDATE_ACTIVE_PAGE, key));
  };
}

export const GET_COMPONENTS = 'CreateActions.GET_COMPONENTS';
export const GET_COMPONENTS_FINISHED = 'CreateActions.GET_COMPONENTS_FINISHED';

export function getComponents(pageID) {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      GET_COMPONENTS,
      CreateEffect.getComponents,
      { pageID }
    );
  };
}

export const ADD_COMPONENT = 'CreateActions.ADD_COMPONENT';
export const ADD_COMPONENT_FINISHED = 'CreateActions.ADD_COMPONENT_FINISHED';

export function addComponent(component) {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      ADD_COMPONENT,
      CreateEffect.addComponent,
      component
    );
  };
}
