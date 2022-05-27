class StorageService {
    constructor() {
        this._providers = [];
    }

    addProvider(provider) {
        this._providers = [...this._providers, provider];
    }

    getProvider(name) {
        return this._providers.filter(v => v._name === name)[0];
    }
}


module.exports = StorageService;


