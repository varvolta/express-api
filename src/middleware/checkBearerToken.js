import jwt                 from 'jsonwebtoken'
import {BEARER_SECRET_KEY} from '../config/jwt.config.js'
import sessionsRepository  from '../repositories/sessionsRepository.js'

export default async (req, res, next) => {
	const bearerHeader = req.headers.authorization

	if (bearerHeader !== undefined && bearerHeader.includes('Bearer ')) {
		const bearerToken = bearerHeader.split(' ')[1]
		try {
			const {userId} = jwt.verify(bearerToken, BEARER_SECRET_KEY)
			if (!userId) res.status(401).send('Access Denied. Wrong bearer token provided.')

			let session = await sessionsRepository.findOne({
				where: {
					user_id: userId,
					token_type: 'bearer',
					token: bearerToken
				}
			})

			if (!session) return res.status(401).send('Access Denied. No session.')
			session.active_at = Date.now()

			await sessionsRepository.save(session)

			req.userId = userId
			next()
		} catch (error) {
			res.status(401).send('Token expired.')
		}
	} else {
		res.status(401).send('Access Denied. No bearer token provided.')
	}
}