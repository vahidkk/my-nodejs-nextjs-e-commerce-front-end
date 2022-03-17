import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from "../actions";
import user_reducer from "../reducers/user_reducer";

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
};
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // register
  const register = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/api/auth/register`, {
        ...userInput,
      });

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data });
    }
  };

  // login
  const login = async (userInput) => {
    setLoading();
    try {
      const { data } = await axios.post(`/api/auth/login`, {
        ...userInput,
      });
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: error.response.data });
    }
  };

  // logout
  const logout = () => {
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider };
