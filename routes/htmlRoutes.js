//
const express = require("express");
const router = express.Router();
const path = require("path");

//
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../develop/public/notes.html"));
});

//
router.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../develop/public/index.html"));
});



module.exports = router;