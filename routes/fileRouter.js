const express = require('express');
const { fileController } = require('../services/index.js');
const { upload, uploadHandler } = require('../lib/uploadHandler.js');

const fileRouter = express.Router();

fileRouter.post('/files', uploadHandler(upload.single('uploaded_file')), fileController.upload);
fileRouter.get('/files/:publicKey', fileController.read);
fileRouter.delete('/files/:privateKey', fileController.delete);

module.exports = fileRouter;
