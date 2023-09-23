import jwt                  from 'jsonwebtoken'
import {REFRESH_SECRET_KEY} from '../config/jwt.config.js'
import sessionsRepository   from '../repositories/sessionsRepository.js'

export default async (userId) => {
	const refreshToken = jwt.sign({userId}, REFRESH_SECRET_KEY, {expiresIn: '1d'})
	let session = await sessionsRepository.findOne({where: {user_id: userId, token_type: 'refresh'}})

	if (!session) {
		session = {
			user_id: userId,
			token_type: 'refresh'
		}
	}

	session.token = refreshToken
	session.created_at = Date.now()
	session.active_at = Date.now()
	session.expire_at = Date.now() + 1000 * 60 * 60 * 24 // 1 day

	await sessionsRepository.save(session)

	return refreshToken
}