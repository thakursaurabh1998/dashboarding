import * as CreateEffect from './CreateEffect';
import * as ActionUtility from '../../utils/ActionUtility';

export const ADD_COMPONENT = 'CreateActions.ADD_COMPONENT';
export const ADD_COMPONENT_FINISHED = 'CreateActions.ADD_COMPONENT_FINISHED';

export function addComponent(value) {
  return async (dispatch) => {
    await ActionUtility.createThunkEffect(
      dispatch,
      ADD_COMPONENT,
      CreateEffect.addComponent,
      value
    );
  };
}
