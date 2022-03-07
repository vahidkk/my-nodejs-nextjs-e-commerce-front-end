import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions";

const reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  throw new Error(`action "${action.type}" not found !`);
};

export default reducer;
