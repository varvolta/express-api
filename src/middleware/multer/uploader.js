import multer                  from 'multer'
import {mkdirSync, existsSync} from 'fs'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		!existsSync('uploads') && mkdirSync('uploads')
		cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

export default multer({storage})