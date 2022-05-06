import {
    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_FAIL,
    NEW_PROJECT_RESET,
    CLEAR_ERRORS,
  } from "../constants/projectConstant";
  

  
  export const newProjectReducer = (state = { project: {} }, action) => {
    switch (action.type) {
      case NEW_PROJECT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_PROJECT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          project: action.payload.project,
        };
      case NEW_PROJECT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_PROJECT_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }
