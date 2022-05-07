import {
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAIL,
  NEW_PROJECT_RESET,
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  ALL_PROJECT_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_RESET,
  DELETE_PROJECT_FAIL,
  NEW_TASK_REQUEST,
  NEW_TASK_SUCCESS,
  NEW_TASK_FAIL,
  NEW_TASK_RESET,
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
};

export const allProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case ALL_PROJECT_REQUEST:
      return {
        loading: true,
      };
    case ALL_PROJECT_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };

    case ALL_PROJECT_FAIL:
      return {
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

export const projectDetailsReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case PROJECT_DETAILS_SUCCESS:
      return {
        loading: false,
        project: action.payload,
      };
    case PROJECT_DETAILS_FAIL:
      return {
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

export const deleteUpdateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROJECT_RESET:
      return {
        ...state,
        isDeleted: false,
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

// New Task Reducer
export const newTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_TASK_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_TASK_RESET:
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
};