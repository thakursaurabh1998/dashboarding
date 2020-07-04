import * as CreateActions from './CreateActions';
const { default: baseReducer } = require('../../utils/BaseReducer');

export const initialState = { components: [], pages: [] };

const createReducer = baseReducer(initialState, {
  [CreateActions.ADD_COMPONENT](state, action) {
    return {
      ...state,
      components: [...state.components, action.payload],
    };
  },
  [CreateActions.ADD_PAGE](state, action) {
    return {
      ...state,
      pages: [...state.pages, action.payload],
    };
  },
  [CreateActions.REMOVE_PAGE](state, action) {
    const targetKey = parseInt(action.payload);
    return {
      ...state,
      pages: state.pages.filter((page) => page.key !== targetKey),
    };
  },
});

export default createReducer;
