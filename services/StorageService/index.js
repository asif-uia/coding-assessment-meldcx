const GStorage = require("./GStorage");
const LocalStorage = require("./LocalStorage");

class StorageService {
    constructor() {
        this._providers = [];
    }

    /**
     * function that adds storage providers to StorageService
     * @param {LocalStorage|GStorage} provider 
     */
    addProvider(provider) {
        this._providers = [...this._providers, provider];
    }


    /**
     * function that returns selected storage provider
     * @param {string} name 
     * @returns {LocalStorage|GStorage}
     */
    getProvider(name) {
        return this._providers.filter(v => v._name === name)[0];
    }
}


module.exports = StorageService;


