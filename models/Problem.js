const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Not Started"
  },
  link: {
    type: String,
    required: true
  },

  // User ownership
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);
