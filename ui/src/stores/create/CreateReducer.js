import * as CreateActions from './CreateActions';
const { default: baseReducer } = require('../../utils/BaseReducer');

export const initialState = { components: [], pages: [] };

const createReducer = baseReducer(initialState, {
  [CreateActions.GET_PAGES_FINISHED](state, action) {
    return {
      ...state,
      pages: action.payload?.data?.data,
    };
  },
  [CreateActions.ADD_COMPONENT](state, action) {
    return {
      ...state,
      components: [...state.components, action.payload],
    };
  },
  [CreateActions.ADD_PAGE_FINISHED](state, action) {
    return {
      ...state,
      pages: [...state.pages, action.meta[0]],
    };
  },
  [CreateActions.REMOVE_PAGE_FINISHED](state, action) {
    const route = action.meta[0][0];
    return {
      ...state,
      pages: state.pages.filter((page) => page.route !== route),
    };
  },
});

export default createReducer;
