import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    USERS_EMAIL_REQUEST,
    USERS_EMAIL_SUCCESS,
    USERS_EMAIL_FAIL,
    CLEAR_ERRORS,
  } from "../constants/userConstant";
  
  export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
  
      case LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case LOAD_USER_FAIL:
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case LOGOUT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const userEmailReducer = (state = { allEmail: [] }, action) => {
    switch (action.type) {

      case USERS_EMAIL_REQUEST:
        return {
          loading: true,
          isAuthenticated: false,
        };
      case USERS_EMAIL_SUCCESS:

        return {
          ...state,
          loading: false,
          allEmail: action.payload,
        };
  
      case USERS_EMAIL_FAIL:
        return {
          ...state,
          loading: false,
          allEmail: null,
          error: action.payload,
        };

  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };