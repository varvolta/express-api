import md5                  from 'md5'
import sessionsRepository   from '../repositories/sessionsRepository.js'
import userRepository       from '../repositories/userRepository.js'
import generateBearerToken  from '../utils/generateBearerToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'

export const signIn = async (req, res) => {
	const {id, password} = req.body

	const user = await userRepository.findOne({where: {id, password: md5(password)}})
	if (user) {
		const bearerToken = await generateBearerToken(user.id)
		const refreshToken = await generateRefreshToken(user.id)
		res.json({bearerToken, refreshToken})
	} else {
		res.sendStatus(403)
	}
}


export const signUp = async (req, res) => {
	const {id, password} = req.body

	if (id && password) {
		let user = await userRepository.findOne({where: {id}})
		if (user) return res.status(409).send('User already exists.')
		user = userRepository.create({id, password: md5(password)})
		await userRepository.save(user)
		const bearerToken = await generateBearerToken(user.id)
		const refreshToken = await generateRefreshToken(user.id)
		res.json({bearerToken, refreshToken})
	} else {
		res.sendStatus(400)
	}
}


export const newToken = async (req, res) => {
	const bearerToken = await generateBearerToken(req.userId)
	res.json({bearerToken})
}


export const info = async (req, res) => {
	res.json({id: req.userId})
}


export const logout = async (req, res) => {
	const sessions = await sessionsRepository.find({where: {user_id: req.userId}})
	await sessionsRepository.remove(sessions)
	res.send('Successfully logged out.')
}

