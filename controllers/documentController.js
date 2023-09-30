const { v4: uuidv4 } = require("uuid");
const { Document, User } = require("../models");
const { containerClient } = require("../helpers/blobService");

class DocumentController {
  static async upload(req, res, next) {
    try {
      const fileId = uuidv4();
      const blobName = fileId;
      const data = req.file.buffer;
      const type = req.file.mimetype;
      const blobOptions = { blobHTTPHeaders: { blobContentType: type } };
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(data, data.length, blobOptions);

      const payload = {
        fileId: fileId,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileURL: blockBlobClient.url,
        status: "SUBMITTED",
        userId: req.currentUserId,
      };
      const document = await Document.create(payload);
      res
        .status(200)
        .json({ message: "File berhasil diupload", data: document });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const document = await Document.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).json({
        message: "Get all Documents",
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const id = req.params.id;
      const payload = {
        status: req.body.status,
      };
      const document = await Document.update(payload, {
        where: {
          id,
        },
        returning: true,
      });
      res.status(200).json({
        message: "Update status successfully",
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DocumentController;
