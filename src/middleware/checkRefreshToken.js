import jwt                  from 'jsonwebtoken'
import {REFRESH_SECRET_KEY} from '../config/jwt.config.js'
import sessionsRepository   from '../repositories/sessionsRepository.js'
import failureResponse      from '../responses/failureResponse.js'

export default async (req, res, next) => {
	const {refreshToken} = req.body

	if (refreshToken !== undefined) {
		try {
			const {userId} = jwt.verify(refreshToken, REFRESH_SECRET_KEY)
			if (!userId) return failureResponse(res)

			let session = await sessionsRepository.findOne({
				where: {
					user_id: userId,
					token_type: 'refresh',
					token: refreshToken
				}
			})

			if (!session) return failureResponse(res)
			session.active_at = Date.now()

			await sessionsRepository.save(session)

			req.userId = userId
			next()
		} catch (error) {
			failureResponse(res)
		}
	} else {
		failureResponse(res)
	}
}