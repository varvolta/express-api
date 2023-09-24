import {Router} from 'express'

import auth  from './auth.router.js'
import files from './files.router.js'

const router = Router()

router.use('/', auth)
router.use('/file', files)

export default router