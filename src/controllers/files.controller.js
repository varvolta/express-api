import {unlinkSync}    from 'fs'
import {extname}       from 'path'
import filesRepository from '../repositories/filesRepository.js'

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
	res.send('Uploaded successfully.')
}

export const list = async (req, res) => {
	const {list_size = 10, page = 1} = req.query
	const skip = (page - 1) * list_size
	const take = list_size * page

	const files = await filesRepository.find({where: {user_id: req.userId}, take, skip})

	res.json(files)
}

export const deleteById = async (req, res) => {
	const id = req.params.id

	const file = await filesRepository.findOne({where: {id}})
	if (file) {
		await filesRepository.remove(file)
		res.send('File deleted.')
	} else {
		res.status(401).send('No file with given id.')
	}
}

export const info = async (req, res) => {
	const id = req.params.id

	const file = await filesRepository.findOne({where: {id}})

	if (file) {
		res.json(file)
	} else {
		res.status(401).send('No file with given id.')
	}
}

export const download = async (req, res) => {
	const id = req.params.id

	const file = await filesRepository.findOne({where: {id}})

	if (file) {
		res.download('uploads/' + file.name)
	} else {
		res.status(401).send('No file with given id.')
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
		
		res.send('Updated successfully.')
	} else {
		res.status(401).send('No file with given id.')
	}
}

