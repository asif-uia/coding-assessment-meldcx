// module dependencies
const { MulterError } = require('multer');
const multer = require('multer');
require('dotenv').config();

// use multer memorystorage engine to utilize file buffer later.
const fileStorage = multer.memoryStorage();

// load multer with options
exports.upload = multer({
    storage: fileStorage,
    limits: {
        // file upto 2 MB can be uploaded
        fileSize: parseInt(process.env.MAX_FILE_SIZE)
    },
    fileFilter(req, file, cb) {
        // accepts all file type
        cb(null, true)
    }
});

// middleware to handle multipart/form-data with multer 
exports.uploadHandler = (cb) => {
    return (req, res, next) => cb(req, res, err => {
        // handle multer error
        if (err instanceof MulterError) {
            return res.status(500).send({
                status: 500,
                details: `Can\'t upload file: ${err.message}`,
            });
        }

        // handle external errors
        if (err) {
            return res.status(500).send({
                status: 500,
                message: `Something went wrong when trying to upload the file`,
            });
        }

        next();
    })
}
