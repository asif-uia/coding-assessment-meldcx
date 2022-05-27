class FileManager {
  constructor() {
    this._provider = null;
  }

  set provider(provider) {
    this._provider = provider;
  }

  get provider() {
    return this._provider;
  }

  async upload(file) {
    return await this._provider.upload(file);
  }

  read(fileName) {
    return this._provider.read(fileName);
  }

  async delete(fileName) {
    return await this._provider.delete(fileName);
  }

}

module.exports = FileManager;