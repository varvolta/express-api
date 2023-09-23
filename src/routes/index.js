import {Router} from 'express'

import auth  from './auth.js'
import files from './files.js'

const router = Router()

router.use('/', auth)
router.use('/file', files)

export default router