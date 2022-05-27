/* module dependencies */
const fs = require('fs');
const cfg = require('../../config')

// utilize fs promises for r/w operations on files
const fileHandler = fs.promises;

class DbService {
    constructor() {
        this._db = `${cfg.db.host}/${cfg.db.dbName}`;
    }

    /**
     * read the database and returns a JSON object
     * @returns {Object}
     */
    read = async () => {
        try {
            const data = await fileHandler.readFile(this._db, 'utf-8');
            return JSON.parse(data.toString());
        } catch (error) {
            throw error;
        }
    }

    /**
     * performs write operations on the database
     * @param {Object} info 
     */
    write = async (info) => {
        try {
            const data = await this.read() || [];
            data.push(info);
            await fileHandler.writeFile(this._db, JSON.stringify(data));
        } catch (error) {
            throw error;
        }
    }

    /**
     * queries the JSON database to find specified JSON object
     * @param {string} key 
     * @returns {Object}
     */
    find = async (key) => {
        try {
            const data = await this.read();
            if (data.length) {
                const byPrivateKey = data.find(element => element.private_key === key);
                const byPublicKey = data.find(element => element.public_key === key);

                if (byPrivateKey) {
                    return {
                        data: byPrivateKey,
                        key: 'privateKey'
                    }
                } else if (byPublicKey) {
                    return {
                        data: byPublicKey,
                        key: 'publicKey'
                    }
                } else {
                    throw new Error('Could not find the element.');
                }

            } else {
                throw new Error('No data in database');
            }

        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * performs rewrite of JSON objects on the database
     * @param {string} key 
     * @param {Object} info 
     */
    update = async (key, info) => {
        try {
            const { data } = await this.find(key);
            await this.delete(data.private_key);
            await this.write(info);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * deletes specified JSON object from the database
     * @param {string} privateKey
     */
    delete = async (privateKey) => {
        try {
            const data = await this.read();
            if (data.length) {
                const newData = data.filter(element => element.private_key != privateKey);

                if (!newData) {
                    throw new Error('No data found by this private key.');
                }

                await fileHandler.writeFile(this._db, JSON.stringify(newData));
            } else {
                throw new Error('No data in database');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DbService;