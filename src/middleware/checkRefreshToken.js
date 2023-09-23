import jwt                  from 'jsonwebtoken'
import {REFRESH_SECRET_KEY} from '../config/jwt.config.js'
import sessionsRepository   from '../repositories/sessionsRepository.js'

export default async (req, res, next) => {
	const {refreshToken} = req.body

	if (refreshToken !== undefined) {
		try {
			const {userId} = jwt.verify(refreshToken, REFRESH_SECRET_KEY)
			if (!userId) res.status(401).send('Access Denied. Wrong refresh token provided.')
			let session = await sessionsRepository.findOne({
				where: {
					user_id: userId,
					token_type: 'refresh',
					token: refreshToken
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
		res.status(401).send('Access Denied. No refresh token provided.')
	}
}