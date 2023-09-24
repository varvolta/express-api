import {Router}           from 'express'
import checkBearerToken   from '../middleware/jwt/checkBearerToken.js'
import {
	upload,
	list,
	deleteById,
	info,
	download,
	update
}                         from '../controllers/files.controller.js'
import uploader           from '../middleware/multer/uploader.js'
import filesListValidator from '../middleware/validators/filesList.validator.js'

const router = Router()

router.post('/upload', checkBearerToken, uploader.single('file'), upload)
router.get('/list', checkBearerToken, filesListValidator, list)
router.delete('/delete/:id', checkBearerToken, deleteById)
router.get('/:id', checkBearerToken, info)
router.get('/download/:id', checkBearerToken, download)
router.put('/update/:id', checkBearerToken, uploader.single('file'), update)

export default router