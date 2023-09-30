const multer = require("multer");
const { BlobServiceClient } = require("@azure/storage-blob");
const config = require("../config/azure");

const { storageAccountName, storageAccountKey, containerName } = config;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=${storageAccountName};AccountKey=${storageAccountKey};EndpointSuffix=core.windows.net`
);

const containerClient = blobServiceClient.getContainerClient(containerName);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.containerClient = containerClient;
exports.upload = upload;
