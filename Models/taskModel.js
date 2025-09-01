const mongoose  = require('mongoose');

const TaskSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  members: {
    type: [String], // store members as an array of names
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  checklist: {
    type: [String],
    default: [],
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports =  Task;
