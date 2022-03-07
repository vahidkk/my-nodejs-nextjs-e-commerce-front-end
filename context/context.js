import { useContext, useEffect, useReducer, createContext } from "react";
import reducer from "../reducers/reducer";
import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions";

const initialState = {
  isSidebarOpen: false,
};

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  useEffect(() => {
    openSidebar();
  }, []);

  return (
    <SideBarContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarContext = () => {
  return useContext(SideBarContext);
};
