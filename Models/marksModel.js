const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema(
  {
    groupNumber: { type: String, required: true },
    groupMembers: { type: [String], required: true }, // ✅ array of strings
    groupMarks: { type: [Number], required: true },   // ✅ array of numbers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Marks", marksSchema);
