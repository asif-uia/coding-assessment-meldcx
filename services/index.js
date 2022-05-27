/* module dependencies */
const TYPES = require('../ioc/types.js');
const Container = require('../ioc');

module.exports = {
	cronService: Container.get(TYPES.CronService),
	fileController: Container.get(TYPES.FileController),
	dbService: Container.get(TYPES.DbService)
}

