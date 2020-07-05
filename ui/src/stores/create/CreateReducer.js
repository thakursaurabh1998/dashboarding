import * as CreateActions from './CreateActions';
const { default: baseReducer } = require('../../utils/BaseReducer');

export const initialState = { components: [], pages: {} };

const createReducer = baseReducer(initialState, {
  [CreateActions.ADD_COMPONENT](state, action) {
    return {
      ...state,
      components: [...state.components, action.payload],
    };
  },
  [CreateActions.GET_PAGES_FINISHED](state, action) {
    const data = action.payload?.data?.data;
    const pages = data.reduce((pages, page) => {
      pages[page.route] = page;
      return pages;
    }, {});
    return {
      ...state,
      pages,
    };
  },
  [CreateActions.ADD_PAGE_FINISHED](state, action) {
    const page = action.meta[0];
    return {
      ...state,
      pages: {
        ...state.pages,
        [page.route]: page,
      },
    };
  },
  [CreateActions.REMOVE_PAGE_FINISHED](state, action) {
    const route = action.meta[0][0];
    const newPagesState = { ...state.pages };
    delete newPagesState[route];
    return {
      ...state,
      pages: newPagesState,
    };
  },
  [CreateActions.EDIT_PAGE_FINISHED](state, action) {
    const page = action.meta[0];
    const oldPageData = state.pages[page.route];
    const newPagesState = { ...state.pages };
    delete newPagesState[page.route];
    return {
      ...state,
      pages: {
        ...newPagesState,
        [page.newRoute]: {
          ...oldPageData,
          route: page.newRoute,
          title: page.newTitle,
        },
      },
    };
  },
});

export default createReducer;
