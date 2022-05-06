const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Project = require("../models/projectModel");

// Create Project

exports.createProject = catchAsyncErrors(async (req, res,next) => {
  const add = await Project.create({
    title:req.body.title,
    projectKey:req.body.projectKey,
    user:req.user.id,
  });

  res.status(201).json({
    add,
    success: true,
    message: "Project created successfully",
  });
});


// Create Task
exports.createTask= catchAsyncErrors(async (req, res, next) => {
  const { taskTitle,assigneUser,description,natureOfTask,status,startTime,endTime,loggingTime ,projectId} = req.body;

  const task = {
    taskTitle,assigneUser,description,natureOfTask,status,startTime,endTime,loggingTime
  };

  let project = await Project.findById(projectId);

  project.tasks.push(task);

  await project.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
