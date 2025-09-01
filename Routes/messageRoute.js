const express  = rrequire( "express");
const Message  = require( "../models/Message.js");
const User =   require("../models/User.js");

const router = express.Router();

// Get all users (dummy or stored in DB)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch messages between two users
router.get("/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a new message
router.post("/messages", async (req, res) => {
  try {
    const { sender, receiver, text, time } = req.body;
    const newMessage = new Message({ sender, receiver, text, time });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
