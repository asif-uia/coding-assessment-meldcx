const fs = require('fs');
const dotEnv = require('dotenv');
dotEnv.config();

const fileHandler = fs.promises;
class LocalStorage {
    constructor() {
        this._name = 'local';
        this._bucket = process.env.FOLDER;
    }

    async upload(file) {
        try {
            // console.log("location: ", this._bucket)
            await fileHandler.writeFile(`${this._bucket}/${file.newfilename}`, file.buffer);
        } catch (error) {
            throw error;
        }
    }

    read(fileName) {
        try {
            return fs.createReadStream(`${this._bucket}/${fileName}`);
        } catch (error) {
            throw error;
        }
    }

    async delete(fileName) {
        try {
            await fileHandler.unlink(`${this._bucket}/${fileName}`);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LocalStorage;