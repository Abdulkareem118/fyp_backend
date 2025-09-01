const express = require("express");
const router = express.Router();
const Group = require("../Models/groupsModel");

// 📌 Create Group
router.post("/", async (req, res) => {
  try {
    const { groupNumber, groupMembers, projectName } = req.body;

    if (!groupNumber || !groupMembers || !projectName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newGroup = new Group({ groupNumber, groupMembers, projectName });
    await newGroup.save();

    res.status(201).json({ message: "✅ Group created", group: newGroup });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get All Groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Update Group
router.put("/:id", async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGroup) {
      return res.status(404).json({ message: "❌ Group not found" });
    }
    res.json({ message: "✅ Group updated", updatedGroup });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📌 Delete Group
router.delete("/:id", async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      return res.status(404).json({ message: "❌ Group not found" });
    }
    res.json({ message: "✅ Group deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
