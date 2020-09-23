const mongoose = require("mongoose");
const config = require("config");
const connectDB = async () => {
  try {
    await mongoose.connect(config.get("MONGOURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
