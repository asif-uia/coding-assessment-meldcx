const { Storage } = require('@google-cloud/storage');
const got = require('got');

require('dotenv').config();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY
    }
});

class GStorage {
    constructor() {
        this._name = 'google';
        this._bucket = storage.bucket(process.env.GCS_BUCKET);
        this._bucket_url = `https://storage.googleapis.com/${process.env.GCS_BUCKET}`;
    }

    /**
     * function to handle upload operation to GCP Bucket
     * @param {Object} file 
     */
    async upload(file) {
        const uploadToGCPBucket = (file) => {
            return new Promise((resolve, reject) => {
                const { newfilename } = file;
                const blob = this._bucket.file(newfilename);
                const blobStream = blob.createWriteStream();

                blobStream.on('error', error => {
                    reject(error);
                });

                blobStream.on('finish', () => {
                    resolve(true);
                });

                blobStream.end(file.buffer);
            });
        }

        try {
            await uploadToGCPBucket(file);
        } catch (error) {
            throw error;
        }
    }

    /**
     * function that reads file from GCP Bucket
     * @param {string} fileName 
     */
    read(fileName) {
        try {
            return got.stream(`${this._bucket_url}/${fileName}`);
        } catch (error) {
            throw error;
        }
    }

    /**
     * function that removes file from GCP Bucket
     * @param {string} fileName 
     */
    async delete(fileName) {
        try {
            await storage.bucket(process.env.GCS_BUCKET).file(fileName).delete();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GStorage;