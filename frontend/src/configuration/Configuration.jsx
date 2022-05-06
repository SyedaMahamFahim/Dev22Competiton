import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  LoginSignup,
  Home,
  CompletedTasks,
  AddTask,
  AssigneeTasks,
  PendingTasks,
  ReporterTasks,
  UpdateTask,
  GetAllTasks,
  ActiveTask,
  SingleTask,
  CreateProject
} from "../pages/index";
import PrivateRoute from "./PrivateRoute";
const Configuration = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-tasks"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
         <Route
          path="/create-project"
          element={
            <PrivateRoute>
              <CreateProject/>
            </PrivateRoute>
          }
        />
        <Route
          path="/completed-tasks"
          element={
            <PrivateRoute>
              <CompletedTasks />
            </PrivateRoute>
          }
        />

        <Route
          path="/pending-tasks"
          element={
            <PrivateRoute>
              <PendingTasks />
            </PrivateRoute>
          }
        />
         <Route
          path="/active-tasks"
          element={
            <PrivateRoute>
              <ActiveTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/get-all-tasks"
          element={
            <PrivateRoute>
              <GetAllTasks />
            </PrivateRoute>
          }
        />
         <Route
          path="/assigned-tasks"
          element={
            <PrivateRoute>
              <AssigneeTasks />
            </PrivateRoute>
          }
        />
         <Route
          path="/reporter-tasks"
          element={
            <PrivateRoute>
              <ReporterTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-task/:id"
          element={
            <PrivateRoute>
              <UpdateTask/>
            </PrivateRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <SingleTask/>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Configuration;
