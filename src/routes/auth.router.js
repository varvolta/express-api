import {Router}          from 'express'
import checkBearerToken  from '../middleware/jwt/checkBearerToken.js'
import {
	signIn,
	signUp,
	info,
	logout,
	newToken
}                        from '../controllers/auth.controller.js'
import checkRefreshToken from '../middleware/jwt/checkRefreshToken.js'
import userValidator     from '../middleware/validators/user.validator.js'

const router = Router()

router.post('/signin', userValidator, signIn)
router.post('/signin/new_token', checkRefreshToken, newToken)
router.post('/signup', userValidator, signUp)
router.get('/info', checkBearerToken, info)
router.get('/logout', checkBearerToken, logout)

export default router