const fs = require('fs');
require('dotenv').config();

const fileHandler = fs.promises;
class LocalStorage {
    constructor() {
        this._name = 'local';
        this._bucket = process.env.FOLDER;
    }

    /**
     * 
     * function that writes file to localstorage
     * @param {Object} file 
     */
    async upload(file) {
        try {
            await fileHandler.writeFile(`${this._bucket}/${file.newfilename}`, file.buffer);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * function that reads file into stream from localstorage
     * @param {string} fileName 
     * @returns {ReadStream}
     */
    read(fileName) {
        try {
            return fs.createReadStream(`${this._bucket}/${fileName}`);
        } catch (error) {
            throw error;
        }
    }

    /**
     * function that removes file from localstorage
     * @param {string} fileName 
     */
    async delete(fileName) {
        try {
            await fileHandler.unlink(`${this._bucket}/${fileName}`);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LocalStorage;