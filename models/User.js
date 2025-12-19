const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  ,
  codeforces: {
    type: String,
    default: ""
  },
  codechef: {
    type: String,
    default: ""
  },
  leetcode: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
