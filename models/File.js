const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema(
  {
    file: {
      url: String,
      key: String,
    },
    filename: {
      type: String,
    },
    // filepath: {
    //   type: String,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchema);
