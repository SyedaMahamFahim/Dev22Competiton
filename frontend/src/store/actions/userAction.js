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
  import axios from "axios";

  import baseUrl from "../../configuration/baseUrl";

  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/user/login`,
        { email, password },
        config
      );
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      localStorage.setItem("token", data.token);

    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  
  // Register
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      // const { data } = await axios.post(`${baseUrl}/api/v1/user/register`,userData,config);
      const { data } = await axios.post(`/api/v1/user/register`,userData,config);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Load User
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`/api/v1/user/profile`);
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };
  
  // Logout User
  export const logout = () => async (dispatch) => {
    try {
      await axios.get(`${baseUrl}/api/v1/user/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };
  
  // Load User
  export const allEmailUser = () => async (dispatch) => {
    try {
      dispatch({ type: USERS_EMAIL_REQUEST });
  
      const { data } = await axios.get(`/api/v1/user/get-all-users-email`);
      dispatch({ type: USERS_EMAIL_SUCCESS, payload: data.allEmail });
      console.log( data.allEmail)
    } catch (error) {
      dispatch({ type: USERS_EMAIL_FAIL, payload: error.response.data.message });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  