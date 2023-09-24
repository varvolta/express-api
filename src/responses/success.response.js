import httpCodes from '../constants/httpCodes.js'

export default (res, result = null, code = httpCodes.OK, message = 'Success') => {
	return res.status(200).json({
		message,
		code,
		result
	})
}