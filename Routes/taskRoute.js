const  express = require("express");
const Task = require("../Models/taskModel");

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
router.post("/", async (req, res) => {
  try {
    const { projectName, members, deadline, checklist } = req.body;

    const newTask = new Task({
      projectName,
      members: members.split(",").map((m) => m.trim()), // convert to array
      deadline,
      checklist,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports =  router;
