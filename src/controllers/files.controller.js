import {unlinkSync}    from 'fs'
import {extname}       from 'path'
import httpCodes       from '../constants/httpCodes.js'
import filesRepository from '../repositories/files.repository.js'
import failureResponse from '../responses/failure.response.js'
import successResponse from '../responses/success.response.js'

export const upload = async (req, res) => {
	if (!req.file) {
		return res.status(400).json({error: 'No file uploaded.'})
	}

	const {filename, mimetype, size} = req.file

	const file = filesRepository.create({
		user_id: req.userId,
		name: filename,
		extension: extname(filename),
		mime: mimetype,
		size,
		uploaded_at: Date.now()
	})

	await filesRepository.save(file)
	successResponse(res)
}

export const list = async (req, res) => {
	const {list_size = 10, page = 1} = req.query
	const skip = (page - 1) * list_size
	const take = list_size * page

	const files = await filesRepository.find({where: {user_id: req.userId}, take, skip})

	successResponse(res, files)
}

export const deleteById = async (req, res) => {
	const id = req.params.id

	const file = await filesRepository.findOne({where: {id}})
	if (file) {
		await filesRepository.remove(file)
		successResponse(res)
	} else {
		failureResponse(res, 'No file with given id.', httpCodes.NOT_FOUND)
	}
}

export const info = async (req, res) => {
	const id = req.params.id

	const file = await filesRepository.findOne({where: {id}})

	if (file) {
		successResponse(res, file)
	} else {
		failureResponse(res, 'No file with given id.', httpCodes.NOT_FOUND)
	}
}

export const download = async (req, res) => {
	const id = req.params.id

	const file = await filesRepository.findOne({where: {id}})

	if (file) {
		res.download('uploads/' + file.name)
	} else {
		failureResponse(res, 'No file with given id.', httpCodes.NOT_FOUND)
	}
}

export const update = async (req, res) => {
	const id = req.params.id

	const {filename, mimetype, size} = req.file

	const file = await filesRepository.findOne({where: {id}})

	if (file) {
		unlinkSync('uploads/' + file.name)

		file.name = filename
		file.mime = mimetype
		file.size = size
		file.extension = extname(filename)
		file.uploaded_at = Date.now()

		await filesRepository.save(file)

		successResponse(res)
	} else {
		failureResponse(res, 'No file with given id.', httpCodes.NOT_FOUND)
	}
}

