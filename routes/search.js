const express = require("express");
const File = require("../models/File");
const router = express.Router();

//searching for files
router.post("/api/file", async (req, res) => {
  try {
    var result;
    const search = req.query.search;
    if (search === "") {
      result = await File.find().populate("user", "name");
    } else {
      result = await File.find({ filename: search });
    }
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
