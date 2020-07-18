import baseReducer from 'utils/BaseReducer';
import * as CreateActions from 'stores/create/CreateActions';

export const initialState = { components: {}, pages: {}, activePage: null };

const createReducer = baseReducer(initialState, {
  [CreateActions.GET_COMPONENTS_FINISHED](state, action) {
    const receivedData = action.payload?.data?.data || [];
    const components = receivedData.reduce((all, comp) => {
      all[comp.key] = comp;
      return all;
    }, {});

    return {
      ...state,
      components,
    };
  },
  [CreateActions.ADD_COMPONENT_FINISHED](state, action) {
    const component = action.meta[0];
    return {
      ...state,
      components: {
        ...state.components,
        [component.key]: component,
      },
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
  [CreateActions.UPDATE_ACTIVE_PAGE](state, action) {
    return {
      ...state,
      activePage: action.payload,
    };
  },
});

export default createReducer;
