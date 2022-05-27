const crypto = require('crypto')

module.exports = {
    generateUniqueName: function (fileName) {
        const uniqueName = crypto.randomBytes(10).toString("hex")
        return `${uniqueName}-${fileName}`
    }
}


