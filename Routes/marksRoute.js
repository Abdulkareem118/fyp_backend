const express = require('express');
const Marks = require('../Models/marksModel');

const router = express.Router();

// ✅ Add new record
router.post("/", async (req, res) => {
  try {
    const { groupNumber, groupMembers, groupMarks } = req.body;
    const newMark = new Marks({ groupNumber, groupMembers, groupMarks });
    await newMark.save();
    res.status(201).json(newMark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all records
router.get("/", async (req, res) => {
  try {
    const marks = await Marks.find();
    res.json(marks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get single record
router.get("/:id", async (req, res) => {
  try {
    const mark = await Marks.findById(req.params.id);
    if (!mark) return res.status(404).json({ message: "Not Found" });
    res.json(mark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update record
router.put("/:id", async (req, res) => {
  try {
    const { groupNumber, groupMembers, groupMarks } = req.body;
    const updated = await Marks.findByIdAndUpdate(
      req.params.id,
      { groupNumber, groupMembers, groupMarks },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete record
router.delete("/:id", async (req, res) => {
  try {
    await Marks.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports =  router;
