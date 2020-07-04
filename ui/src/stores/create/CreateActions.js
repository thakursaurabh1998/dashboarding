import * as CreateEffect from './CreateEffect';
import * as ActionUtility from '../../utils/ActionUtility';

export const ADD_COMPONENT = 'CreateActions.ADD_COMPONENT';

export function addComponent(value) {
  return async (dispatch) => {
    dispatch(ActionUtility.createAction(ADD_COMPONENT, value));
  };
}

export const ADD_PAGE = 'CreateActions.ADD_PAGE';

export function addPage(page) {
  return async (dispatch) => {
    dispatch(ActionUtility.createAction(ADD_PAGE, page));
  };
}

export const REMOVE_PAGE = 'CreateActions.REMOVE_PAGE';

/**
 * @param {number} pageKey
 */
export function removePage(pageKey) {
  return async (dispatch) => {
    dispatch(ActionUtility.createAction(REMOVE_PAGE, pageKey));
  };
}
