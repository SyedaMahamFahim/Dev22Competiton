const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  assigneUser: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  natureOfTask:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  loggingTime: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    ref: "Project",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
