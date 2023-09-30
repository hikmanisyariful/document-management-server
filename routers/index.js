const express = require("express");
const router = express.Router();
const users = require("./user");
const documents = require("./document");

router.get("/", (req, res) => {
  res.send("hello world - document management");
});

router.use(users);
router.use(documents);

module.exports = router;
