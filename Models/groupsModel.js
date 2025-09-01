const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupNumber: {
      type: [String], // 👈 now groupNumber can store an array of strings
      required: true,
    },
    groupMembers: {
      type: [String], // 👈 array of members instead of comma-separated string
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
