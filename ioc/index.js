/* module dependencies */
const inversify = require('inversify');
const TYPES = require('./types.js');
const StorageService = require('../services/StorageService');
const DbService = require('../services/DbService');
const CryptoService = require('../services/CryptoService');
const CronService = require('../services/CronService');
const FileManager = require('../services/StorageService/FileManager.js');
const FileController = require('../controllers/FileController.js');
const LocalStorage = require('../services/StorageService/LocalStorage.js');
const GStorage = require('../services/StorageService/GStorage.js');

require('reflect-metadata');
require('dotenv').config();

// declare external classes as injectable
inversify.decorate(inversify.injectable(), StorageService);
inversify.decorate(inversify.injectable(), DbService);
inversify.decorate(inversify.injectable(), CryptoService);
inversify.decorate(inversify.injectable(), CronService);
inversify.decorate(inversify.injectable(), FileManager);
inversify.decorate(inversify.injectable(), FileController);

// create inversity container instance
const Container = new inversify.Container();

// bind instances to inversify containers
Container.bind(TYPES.StorageService).to(StorageService);
Container.bind(TYPES.DbService).to(DbService);
Container.bind(TYPES.CryptoService).to(CryptoService);
Container.bind(TYPES.CronService).to(CronService);
Container.bind(TYPES.FileManager).to(FileManager);
Container.bind(TYPES.FileController).to(FileController);

// retrieving instances from container
const fileManagerInstance = Container.get(TYPES.FileManager);
const storageService = Container.get(TYPES.StorageService);

// add local storage and gcp storage provider to storage services
storageService.addProvider(new LocalStorage());
storageService.addProvider(new GStorage());

// get provider from env and set the default storage provider
fileManagerInstance.provider = storageService.getProvider(process.env.PROVIDER);

// bind types with constant values for dependent use cases
Container.bind(TYPES.FileManagerInstance).toConstantValue(fileManagerInstance);
Container.bind(TYPES.CryptoLength).toConstantValue(100);

/* Annotate dependencies for CronService */
inversify.decorate(inversify.inject(TYPES.DbService), CronService, 0);
inversify.decorate(inversify.inject(TYPES.FileManagerInstance), CronService, 1);

/* Annotate dependencies for CryptoService */
inversify.decorate(inversify.inject(TYPES.CryptoLength), CryptoService, 0);

/* Annotate dependencies for FileController */
inversify.decorate(inversify.inject(TYPES.FileManagerInstance), FileController, 0);
inversify.decorate(inversify.inject(TYPES.DbService), FileController, 1);
inversify.decorate(inversify.inject(TYPES.CryptoService), FileController, 2);


module.exports = Container;

