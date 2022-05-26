const app = require('../../app')
const request = require('supertest')
const { log } = require('console')
const async = require('async')

const filePath = `/home/Drive-A/coding_assessment_meldcx/example/testfile`;

describe('Uploading a file - POST /files', () => {
	it('should upload the file', async () => {
		const res = await request(app)
			.post('/files')
			.attach('uploaded_file', filePath) // Attach the file with a key named 'uploaded_file'

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('publicKey');
		expect(res.body).toHaveProperty('privateKey');
		expect(res.body.message).toBe("file uploaded successfully");
	});
})

describe('Downloading a file - GET /files/:publicKey', () => {
	it('should download the file', async () => {
		const res = await request(app)
			.get('/files/50b91282ff6ebc8d8c67bc3c')
		// log(res)
		expect(res.statusCode).toBe(200)
	});
})

// describe('Delete a file - DELETE /files/:publicKey', () => {
// 	it('should delete the file', async () => {
// 		const res = await request(app)
// 			.delete('/files/0638cc94d02ca153b1abbf1b84')
// 		const body = JSON.parse(res.text)
// 		log(res.body)

// 		expect(res.statusCode).toBe(201)
// 		expect(body.message).toBe("file deleted successfully.")
// 	})
// })


