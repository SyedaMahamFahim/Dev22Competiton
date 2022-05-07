const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Project = require("../models/projectModel");
const ErrorHander = require("../utils/errorhander");

// Create Project

exports.createProject = catchAsyncErrors(async (req, res, next) => {
  const add = await Project.create({
    title: req.body.title,
    projectKey: req.body.projectKey,
    user: req.user.id,
  });

  res.status(201).json({
    add,
    success: true,
    message: "Project created successfully",
  });
});

// Get Single Project Details
exports.getProjectDetail = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// Get All Project
exports.getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    project,
  });
});

// Delete Project

exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }
  await project.remove();

  res.status(200).json({
    success: true,
    message: "Project Delete Successfully",
  });
});

// Updated Project
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    project,
  });
});

// Create Task
exports.createTask = catchAsyncErrors(async (req, res, next) => {
  const {
    taskTitle,
    assigneUser,
    description,
    natureOfTask,
    status,
    startTime,
    endTime,
    loggingTime,
    projectId,
  } = req.body;

  const task = {
    taskTitle,
    assigneUser,
    description,
    natureOfTask,
    status,
    startTime,
    endTime,
    loggingTime,
  };

  let project = await Project.findById(projectId);

  project.tasks.push(task);

  await project.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
