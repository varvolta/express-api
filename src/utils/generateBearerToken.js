import jwt                 from 'jsonwebtoken'
import {BEARER_SECRET_KEY} from '../config/jwt.config.js'
import sessionsRepository  from '../repositories/sessionsRepository.js'

export default async (userId) => {
	const bearerToken = jwt.sign({userId}, BEARER_SECRET_KEY, {expiresIn: '10m'})
	let session = await sessionsRepository.findOne({where: {user_id: userId, token_type: 'bearer'}})

	if (!session) {
		session = {
			user_id: userId,
			token_type: 'bearer'
		}
	}

	session.token = bearerToken
	session.created_at = Date.now()
	session.active_at = Date.now()
	session.expire_at = Date.now() + 1000 * 60 * 10 // 10 minutes

	await sessionsRepository.save(session)

	return bearerToken
}