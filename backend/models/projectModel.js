const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Project Title"],
    trim: true,
  },
  projectKey: {
    type: String,
    required: [true, "Please Enter Project Key"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {

      assigneUser: [],
      taskTitle: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      natureOfTask: {
        type: String,
        required: true,
      },
      status: {
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
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
