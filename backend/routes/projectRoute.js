const express = require("express");
const { createProject,createTask } = require("../controllers/projectController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/create-project").post(isAuthenticatedUser, createProject);

router.route("/create-task").put(isAuthenticatedUser, createTask);

module.exports = router;
