/* module dependencies */
const moment = require('moment');
const cfg = require('../../config')
require('dotenv').config()

class CronService {
    constructor(dbService, fileManager) {
        this._dbService = dbService;
        this._fileManager = fileManager;
    }

    /**
     * 
     * function to clean up inactive files
     * @param {Array} inactiveFiles 
     */
    cleanUpInactiveFiles = async (inactiveFiles) => {
        try {
            if (inactiveFiles.length) {
                inactiveFiles.forEach(async (file) => {
                    const { file_name, private_key } = file;

                    await this._fileManager.delete(file_name)
                    await this._dbService.delete(private_key)
                });
                cfg.logger.info('Total removed files: ' + inactiveFiles.length)
            }

        } catch (error) {
            throw error;
        }
    }

    /**
     * check for inactive files and returns an array of file elements
     * @returns {Array}
     */
    fetchInactiveFiles = async () => {
        try {
            const data = await this._dbService.read();
            const currentTime = moment();

            const inactiveFiles = [];

            data.forEach(element => {
                const inactiveTime = currentTime.diff(moment(element.uploaded_at), 'minutes');
                if (inactiveTime >= parseInt(process.env.MAX_INACTIVE_TIME)) {
                    inactiveFiles.push(element);
                }
            });

            return inactiveFiles;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = CronService;