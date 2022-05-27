const moment = require('moment');
const { generateUniqueName } = require('../lib/utils.js');

class FileController {
    constructor(fileManager, dbService, cryptoService) {
        this._fileManager = fileManager;
        this._dbService = dbService;
        this._cryptoService = cryptoService;
    }

    /**
     * 
     * function that handles file upload operations
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Object}
     */
    upload = async (req, res) => {
        try {
            const file = req.file;
            const newFileName = generateUniqueName(file.originalname);
            file.newfilename = newFileName;

            await this._fileManager.upload(file);

            const { publicKey, privateKey } = this._cryptoService.generateKeyPairs();
            const fileInfo = {
                file_name: newFileName,
                mime_type: file.mimetype,
                private_key: privateKey,
                public_key: publicKey,
                uploaded_at: moment().format()
            }

            await this._dbService.write(fileInfo);

            const response = {
                message: "file uploaded successfully",
                privateKey: privateKey,
                publicKey: publicKey
            }

            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    /**
     * 
     * function that handles file read operations
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Object}
     */
    read = async (req, res) => {
        try {
            const { publicKey } = req.params;
            const { data, key } = await this._dbService.find(publicKey);

            if (data && key === 'publicKey') {

                const file = this._fileManager.read(data.file_name);

                res.setHeader('Content-Type', data.mime_type);
                res.setHeader('Content-Disposition', `attachment; filename=${data.file_name}`);

                file.on('close', async () => {

                    const fileInfo = {
                        file_name: data.file_name,
                        mime_type: data.mime_type,
                        private_key: data.private_key,
                        public_key: data.public_key,
                        processed_time: moment().format()
                    }

                    await this._dbService.update(data.private_key, fileInfo);

                    res.end();
                });

                file.on('error', (error) => {
                    return res.status(500).json({ message: 'Server Error!' });
                });

                file.pipe(res);

            } else {
                return res.status(404).json({ message: 'file not found' });
            }

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    }

    /**
     * function that handles file delete operation
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Object}
     */
    delete = async (req, res) => {

        try {
            const { privateKey } = req.params;
            const { data, key } = await this._dbService.find(privateKey);

            if (data && key === 'privateKey') {
                await this._fileManager.delete(data.file_name);
                await this._dbService.delete(privateKey);
                res.status(201).json({ message: 'file deleted successfully.' });
            } else {
                throw new Error('Private key not found!');
            }

        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = FileController;