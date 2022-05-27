const cron = require('node-cron');
const cfg = require('./config');
const { cronService } = require('./services/index.js');

exports.cronJob = () => {
    /** 
      * execute cronjob every 30 minutes 
      * fetch inactive files and cleanup 
    */
    cron.schedule('*/30 * * * *', async () => {
        cfg.logger.info('Performing inactive files cleanup...');

        try {
            const files = await cronService.fetchInactiveFiles();
            await cronService.cleanUpInactiveFiles(files);
        } catch (error) {
            console.error(error);
        }

    });
}




