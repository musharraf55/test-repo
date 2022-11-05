const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    token: String,
  },
  { timestamp: true }
);

module.exports = mongoose.model("user", userSchema);
