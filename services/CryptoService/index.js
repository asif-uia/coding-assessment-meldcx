/* module dependencies */
const { createDiffieHellman } = require('crypto')

class CryptoService {
    constructor(length) {
        this._primeLength = length || 64;
        this._diffHell = createDiffieHellman(this._primeLength);
    }

    /**
     * function that generates and returns public and private keys
     * @returns {string, string}
     */
    generateKeyPairs = () => {
        this._diffHell.generateKeys('hex');
        const publicKey = this._diffHell.getPublicKey('hex');
        const privateKey = this._diffHell.getPrivateKey('hex');

        return { publicKey, privateKey };
    }

}

module.exports = CryptoService;