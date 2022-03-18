import {
  SET_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  CHANGENAME_USER_SUCCESS,
  CHANGEPASSWORD_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHANGENAME_USER_ERROR,
  CHANGEPASSWORD_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
} from "../actions";

const user_reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false, editComplete: false };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      userId: action.payload.id,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      userId: action.payload.id,
    };
  }
  if (action.type === CHANGENAME_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.name,
      userId: action.payload.id,
    };
  }
  if (action.type === CHANGEPASSWORD_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // user: action.payload.name,
      // userId: action.payload.id,
      passwordChanged: true,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      showAlert: action.payload,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
      showAlert: action.payload,
    };
  }
  if (action.type === CHANGENAME_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      // user: null,
      showAlert: action.payload,
    };
  }
  if (action.type === CHANGEPASSWORD_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      passwordChanged: false,
      showAlert: action.payload,
    };
  }

  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload.name,
      userId: action.payload.userId,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      userId: null,
      showAlert: false,
    };
  }

  throw new Error(`no such action : ${action}`);
};

export default user_reducer;
