const express = require("express");
const authentication = require("../middlewares/authentication");
const router = express.Router();
const UserController = require("../controllers/userController.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authentication);
router.get("/profile", UserController.getProfile);

module.exports = router;
