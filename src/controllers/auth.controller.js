import md5                  from 'md5'
import httpCodes            from '../constants/httpCodes.js'
import sessionsRepository   from '../repositories/sessionsRepository.js'
import userRepository       from '../repositories/userRepository.js'
import failureResponse      from '../responses/failureResponse.js'
import successResponse      from '../responses/successResponse.js'
import generateBearerToken  from '../utils/generateBearerToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'

export const signIn = async (req, res) => {
	const {id, password} = req.body

	const user = await userRepository.findOne({where: {id: id.toLowerCase(), password: md5(password)}})
	if (user) {
		const bearerToken = await generateBearerToken(user.id)
		const refreshToken = await generateRefreshToken(user.id)
		successResponse(res, {bearerToken, refreshToken})
	} else {
		failureResponse(res, 'Forbidden', httpCodes.FORBIDDEN)
	}
}


export const signUp = async (req, res) => {
	let {id, password} = req.body
	id = id.toLowerCase()

	if (id && password) {
		let user = await userRepository.findOne({where: {id: id}})
		if (user) return res.status(409).send('User already exists.')
		user = userRepository.create({id, password: md5(password)})
		await userRepository.save(user)
		const bearerToken = await generateBearerToken(user.id)
		const refreshToken = await generateRefreshToken(user.id)
		successResponse(res, {bearerToken, refreshToken})
	} else {
		failureResponse(res, 'Forbidden', httpCodes.FORBIDDEN)
	}
}


export const newToken = async (req, res) => {
	const bearerToken = await generateBearerToken(req.userId)
	successResponse(res, {bearerToken})
}


export const info = async (req, res) => {
	successResponse(res, {id: req.userId})
}


export const logout = async (req, res) => {
	const sessions = await sessionsRepository.find({where: {user_id: req.userId}})
	await sessionsRepository.remove(sessions)
	successResponse(res)
}

