import * as CreateActions from './CreateActions';
const { default: baseReducer } = require('../../utils/BaseReducer');

export const initialState = [];

const createReducer = baseReducer(initialState, {
  [CreateActions.ADD_COMPONENT_FINISHED](state, action) {
    return [...state, action.payload];
  },
});

export default createReducer;
