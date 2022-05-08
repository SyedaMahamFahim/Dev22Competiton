import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  LoginSignup,
  SingleTask,
  CreateProject,
  Projects,
  SingleProject,
  CreateTask,
  Tasks,
} from "../pages/index";
import PrivateRoute from "./PrivateRoute";
const Configuration = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PrivateRoute>
              <SingleProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/all-tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/:id/create-task"
          element={
            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-project"
          element={
            <PrivateRoute>
              <CreateProject />
            </PrivateRoute>
          }
        />
  

        <Route
          path="/project/:id/task/:taskId"
          element={
            <PrivateRoute>
              <SingleTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Configuration;
