const express = require("express");
const authentication = require("../middlewares/authentication");
const { upload } = require("../helpers/blobService");
const DocumentController = require("../controllers/documentController.js");

const router = express.Router();

router.use(authentication);
router.post("/upload", upload.single("file"), DocumentController.upload);
router.get("/documents", DocumentController.findAll);
router.get("/documents/:id", DocumentController.findOne);
router.put("/documents/:id", DocumentController.updateStatus);
router.delete("/documents/:id", DocumentController.delete);

module.exports = router;
