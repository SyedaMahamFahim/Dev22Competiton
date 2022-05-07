import axios from "axios";
import baseUrl from "../../configuration/baseUrl";
import {
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAIL,
  CLEAR_ERRORS,
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  ALL_PROJECT_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  NEW_TASK_REQUEST,
  NEW_TASK_SUCCESS,
  NEW_TASK_FAIL,
  DELETE_PROJECT_FAIL,

} from "../constants/projectConstant";



// Get All Projects
export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PROJECT_REQUEST });

    const { data } = await axios.get("/api/v1/project/projects");

    dispatch({
      type: ALL_PROJECT_SUCCESS,
      payload: data.project,
    });
    console.log(data.project)
  } catch (error) {
    dispatch({
      type: ALL_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Project
export const createProject = (projectData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PROJECT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/project/create-project`,
      projectData,
      config
    );

    dispatch({
      type: NEW_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Single Project Details

export const getProjectDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/project/project/${id}`);
    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: data.project,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Project
export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });

    const { data } = await axios.delete(`/api/v1/project/project/${id}`);

    dispatch({
      type: DELETE_PROJECT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newTask = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TASK_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/project/create-task`, taskData, config);

    dispatch({
      type: NEW_TASK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_TASK_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
