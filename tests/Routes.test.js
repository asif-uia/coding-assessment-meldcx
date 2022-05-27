/* module dependencies */
const app = require('../app')
const supertest = require('supertest')
const { log } = require('console')
const async = require('async')
const cfg = require('../config')
const resDet = require('../lib/result.details')

const request = supertest(app)

// demo file path for testing
const filePath = `/home/Drive-A/coding_assessment_meldcx/uploads/testfile`;
let keys = {}

/* test suite for checking POST /files */
describe('Uploading a file - POST /files', () => {
	it('should upload the file', async () => {
		const res = await request
			.post('/files')
			.attach('uploaded_file', filePath) // Attach the file with a key named 'uploaded_file'

		Object.assign(keys, res.body) // assigns uploaded file keys to use in the Download file testsuite.
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('publicKey');
		expect(res.body).toHaveProperty('privateKey');
		expect(res.body.message).toBe("file uploaded successfully");
	});
})

// /* test suite for checking GET /files/:publicKey */
describe('Downloading a file - GET /files/:publicKey', () => {
	it('should download the file', async () => {
		// const publicKey = "77689e489a7d545dc6b6b978" // provide publicKey for checking existing file

		const apiPath = `/files/${keys.publicKey}` // use public key for just uploaded file
		const res = await request.get(apiPath)

		expect(res.statusCode).toBe(200)
		expect(res.type).toBe("application/octet-stream")
	});
})


/* test suite for deleting file - DELETE /files/:privateKey */
describe('Delete a file - DELETE /files/:privateKey', () => {
	it('should delete the file or display message for non-existent file', async () => {
		const privateKey = "04057c24874f1166b585b80e14" /** use one of the keys from db/datastore.json to test */
		const apiPath = `/files/${privateKey}`

		const res = await request.delete(apiPath)
		const body = JSON.parse(res.text)

		// console.log("resbody: ", body)

		const matchedMessage = resDet.deleteRoute.message.filter(x => body.message.indexOf(x) > -1).length;
		const matchedStatus = resDet.deleteRoute.code.filter(x => res.statusCode.toString().indexOf(x) > -1).length;

		expect(matchedStatus).toBeGreaterThan(0)
		expect(matchedMessage).toBeGreaterThan(0)
	})
})