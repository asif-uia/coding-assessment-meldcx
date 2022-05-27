/* module dependencies */
const express = require('express');
const { fileController } = require('../services/index.js');
const { upload, uploadHandler } = require('../lib/uploadHandler.js');

// get express router instance
const fileRouter = express.Router();

// file routes for /files, /files/:publicKey and /files/:privateKey
fileRouter.post('/files', uploadHandler(upload.single('uploaded_file')), fileController.upload);
fileRouter.get('/files/:publicKey', fileController.read);
fileRouter.delete('/files/:privateKey', fileController.delete);

module.exports = fileRouter;
