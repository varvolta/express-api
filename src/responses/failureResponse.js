import httpCodes from '../constants/httpCodes.js'

export default (res, error = 'Unauthorized', code = httpCodes.UNAUTHORIZED, message = 'Failure') => {
	return res.status(200).json({
		message,
		code,
		error
	})
}