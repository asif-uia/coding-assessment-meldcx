const DbService = require('../services/DbService')
const LocalStorage = require('../services/StorageService/LocalStorage');
const fs = require("fs");

beforeEach = () => {

}

/* test suite for checking dbService module */
describe('Check DBService Module', () => {
	const db = new DbService()
	test('Should check read function', async () => {
		const parseSpy = jest.spyOn(JSON, 'parse');
		const fsSpy = jest.spyOn(fs.promises, 'readFile');

		await db.read()
		expect(fsSpy).toHaveBeenCalled();
		expect(parseSpy).toHaveBeenCalledTimes(1);
	})

	test('Should write to database', async () => {
		const db = new DbService()
		const stringifySpy = jest.spyOn(JSON, 'stringify');
		const fsSpy = jest.spyOn(fs.promises, 'writeFile');

		const fakeData = {
			file_name: "234515523145352e4ee",
			mime_type: "application/octet-stream",
			private_key: "431245f4b4dc5e923738",
			public_key: "07a7689f42314587908a",
			uploaded_at: "2022-02-28T01:26:07+06:00"
		}

		await db.write(fakeData)

		expect(fsSpy).toHaveBeenCalledTimes(1)
		expect(stringifySpy).toHaveBeenCalledTimes(1);
	})

	test('Should delete entry from database', async () => {
		const db = new DbService()
		const readerSpy = jest.spyOn(db, 'read');
		const fsSpy = jest.spyOn(fs.promises, 'writeFile');
		const filterSpy = jest.spyOn(Array.prototype, 'filter');

		const key = "07a7689fb2259e1b14ef87908a" // use existing key in db
		await db.delete(key)

		expect(fsSpy).toHaveBeenCalled();
		expect(readerSpy).toHaveBeenCalledTimes(1)
		expect(filterSpy).toHaveBeenCalledTimes(1)
	})

	test('Should find and return an entry from database', async () => {
		const db = new DbService()
		const readerSpy = jest.spyOn(db, 'read');

		const key = "04d6aaa1a73805616793ba1f7e" // use existing key in db

		const res = await db.find(key)

		expect(res.data).toHaveProperty("file_name")
		expect(res.data).toHaveProperty("mime_type")
		expect(res.data).toHaveProperty("private_key")
		expect(res.data).toHaveProperty("public_key")
		expect(res.data).toHaveProperty("uploaded_at")
		expect(readerSpy).toHaveBeenCalledTimes(1)
	})

	/**
	 * use a key from datastore.json to test
	test('Should update a database entry', async () => {
		const db = new DbService()
		const delSpy = jest.spyOn(db, 'delete');
		const writeSpy = jest.spyOn(db, 'write');

		const key = "04d6aaa1a73805616793ba1f7e" // use existing key in db
		const fakeData = {
			file_name: "234515523413252e4ee",
			mime_type: "application/json",
			private_key: "43124923738",
			public_key: "07a4587908a",
			uploaded_at: "2022-02-18T01:26:07+06:00"
		}
		await db.update(key, fakeData)

		expect(delSpy).toHaveBeenCalledTimes(1);
		expect(writeSpy).toHaveBeenCalledTimes(1)
	})
	 */
})

/* test suite for checking LocalStorage module */
describe('Check LocalStorage Module', () => {
	const localStorage = new LocalStorage()
	test('Should check file upload function', async () => {
		const fileName = "testfile" // use valid file from uploads/ dir.
		const fsSpy = jest.spyOn(fs.promises, 'writeFile');
		await localStorage.upload(fileName)

		expect(fsSpy).toHaveBeenCalled();
	})

	/**
	 * use valid fileName from /uploads dir to test
	 */
	test('Should check file read function', async () => {
		const fileName = "442b3f12e3ef6285c440-testfile" // use valid file from uploads/ dir.
		const fsSpy = jest.spyOn(fs, 'createReadStream');
		await localStorage.read(fileName)

		expect(fsSpy).toHaveBeenCalled();
	})

	/**
	 * use valid fileName from /uploads dir to test
	test('Should check file delete function', async () => {
		const fileName = "442b3f12e3ef6285c440-testfile" // use valid file from uploads/ dir.
		const fsSpy = jest.spyOn(fs.promises, 'unlink');
		await localStorage.delete(fileName)

		expect(fsSpy).toHaveBeenCalled();
	})
	*/

})