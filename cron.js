const cron = require('node-cron');
const cfg = require('./config');
const { cronService } = require('./services/index.js');

exports.cronJob = () => {
    /**
     * executes inactive files cleanup job every 30 minutes 
     */
    cron.schedule('*/30 * * * *', async () => {
        cfg.logger.info('Performing inactive files cleanup...');

        try {
            const files = await cronService.fetchInactiveFiles();
            await cronService.cleanUpInactiveFiles(files);
        } catch (error) { }

    });
}




