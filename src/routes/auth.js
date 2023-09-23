import {Router}          from 'express'
import checkBearerToken  from '../middleware/checkBearerToken.js'
import {
	signIn,
	signUp,
	info,
	logout,
	newToken
}                        from '../controllers/auth.controller.js'
import checkRefreshToken from '../middleware/checkRefreshToken.js'

const router = Router()

router.post('/signin', signIn)
router.post('/signin/new_token', checkRefreshToken, newToken)
router.post('/signup', signUp)
router.get('/info', checkBearerToken, info)
router.get('/logout', checkBearerToken, logout)

export default router