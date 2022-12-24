// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
require("dotenv").config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.get("/api", (req, res, next) => {
  let date = new Date();
  res.json({ unix: Date.parse(date), utc: date.toUTCString() });
  next();
});
app.get("/api/:date", (req, res, next) => {
  let param = req.params.date;
  let isDateIntegerNum = Number.isInteger(+param);
  try {
    let date = new Date(isDateIntegerNum === true ? +param : param);
    if (date.toString() === "Invalid Date") {
      throw err;
    }
    res.json({ unix: Date.parse(date), utc: date.toUTCString() });
  } catch (err) {
    res.json({ error: "Invalid Date" });
  }
  next();
});
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
