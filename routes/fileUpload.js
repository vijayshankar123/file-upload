const express = require("express");
const File = require("../models/File");
const config = require("config");
const User = require("../models/User");
const formidable = require("formidable");
const fs = require("fs");
const auth = require("../middleware/auth");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const AWS = require("aws-sdk");

//s3
const s3 = new AWS.S3({
  accessKeyId: config.get("AWSCLIENTID"),
  secretAccessKey: config.get("AWSCLIENTKEY"),
  region: config.get("AWSREGION"),
});

//get files (ALL FILES for admin)
router.get("/api/files/all", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    console.log(currentUser);
    if (!currentUser) {
      return res.status(401).json({ msg: "UnAuthorized Access" });
    }
    if (currentUser.role === "User") {
      const files = await File.find({ user: req.user.id });
      if (!files) {
        return res.status(404).json({ msg: "No files found" });
      }
      return res.json(files);
    }
    const files = await File.find().populate("user", " name ");
    if (!files) {
      return res.status(404).json({ msg: "No files found" });
    }
    res.json(files);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//file uploading form (AMAZON S3)
router.post("/api/file/create", auth, async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (files.file.type != "application/pdf") {
        return res.status(500).json({ msg: "Only pdf files allowed" });
      }
      console.log(files, fields);
      if (err) {
        return res.status(400).json({ error: "image could not upload" });
      }
      console.table({ err, fields, files });
      //destructuring name and content from fields

      let file = await new File({
        user: req.user.id,
      });
      if (files.file.size > 1000000) {
        return res
          .status(400)
          .json({ error: "File size should be less than 1mb" });
      }

      const params = {
        Bucket: "trailhackr",
        Key: `catagory/${uuidv4()}.pdf`,
        Body: fs.readFileSync(files.file.path),
        ACL: "public-read",
        ContentType: "application/pdf",
      };

      //uploading to s3
      s3.upload(params, async function (err, data) {
        if (err) {
          return res.status(400).json({ msg: err });
        }

        file.filename = files.file.name;
        file.file.url = data.Location;
        file.file.key = data.Key;

        //saving to DB
        await file.save();
        res.json(file);
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "server error" });
  }
});

//get single file for downloading
router.get("/api/get/file", async (req, res) => {
  try {
    const key = req.query.key;
    AWS.config.update({
      accessKeyId: config.get("AWSCLIENTID"),
      secretAccessKey: config.get("AWSCLIENTKEY"),
      region: config.get("AWSREGION"),
    });
    var s3 = new AWS.S3();
    var options = {
      Bucket: "trailhackr",
      Key: key,
    };

    res.attachment(options.Key);
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
