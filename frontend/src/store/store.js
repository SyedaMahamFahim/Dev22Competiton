import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  userEmailReducer
} from "./reducers/userReducer";

import {
  newProjectReducer,
  allProjectReducer,
  projectDetailsReducer,
  deleteUpdateProductReducer,
  newTaskReducer
} from './reducers/projectReducer'

const reducer = combineReducers({
  user: userReducer,
  userEmail:userEmailReducer,
  allProjects:allProjectReducer,
  newProject:newProjectReducer,
  projectDetails:projectDetailsReducer,
  deleteUpdateProduct:deleteUpdateProductReducer,
  newTask:newTaskReducer
});


const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
