class FileManager {
  constructor() {
    this._provider = null;
  }

  /**
   * setter method for storage provider
   */
  set provider(provider) {
    this._provider = provider;
  }

  /**
   * getter method for returning storage provider
   */
  get provider() {
    return this._provider;
  }

  /**
   * function to handle upload operation
   * @param {Object} file 
   * @returns {Promise}
   */
  async upload(file) {
    return await this._provider.upload(file);
  }

  /**
   * function to handle read operation from storage provider
   * @param {string} fileName 
   * @returns {Promise}
   */
  read(fileName) {
    return this._provider.read(fileName);
  }

  /**
   * function to handle delete operation from storage provider
   * @param {string} fileName 
   * @returns {Promise}
   */
  async delete(fileName) {
    return await this._provider.delete(fileName);
  }

}

module.exports = FileManager;