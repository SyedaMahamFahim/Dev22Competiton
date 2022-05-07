const express = require("express");
const { createProject,createTask ,getProjectDetail,getAllProjects,deleteProject,
    updateProject} = require("../controllers/projectController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { sendEmail } = require("../utils/sendEmail");

const router = express.Router();

router.route("/create-project").post(isAuthenticatedUser, createProject);
router.route("/project/:id")
.get(isAuthenticatedUser, getProjectDetail)
.delete(isAuthenticatedUser, deleteProject)

router.route("/send-email").post(sendEmail);


router.route("/projects/").get(isAuthenticatedUser, getAllProjects);

router.route("/create-task").put(isAuthenticatedUser, createTask);

module.exports = router;
