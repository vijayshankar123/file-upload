const express = require("express");
const connectDB = require("./config/db");
const user = require("./routes/user");
const auth = require("./routes/auth");
const search = require("./routes/search");
const path = require("path");

const fileUpload = require("./routes/fileUpload");
const app = express();

//middleware
app.use(express.json({ extended: false }));

//conecting database
connectDB();

//routing
app.use(user);
app.use(auth);
app.use(fileUpload);
app.use(search);

//serve static assets in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//listening port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("app started on port ", port);
});
