const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
