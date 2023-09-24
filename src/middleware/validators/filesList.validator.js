import Joi             from 'joi'
import httpCodes       from '../../constants/httpCodes.js'
import failureResponse from '../../responses/failure.response.js'

const schema = Joi.object({
	list_size: Joi.number().positive(),
	page: Joi.number().positive()
})

export default async (req, res, next) => {
	const {list_size = 10, page = 1} = req.query
	const {error} = schema.validate({list_size, page})
	if (error) {
		failureResponse(res, error.toString(), httpCodes.BAD_REQUEST)
	} else {
		next()
	}
}