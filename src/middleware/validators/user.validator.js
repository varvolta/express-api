import Joi             from 'joi'
import httpCodes       from '../../constants/httpCodes.js'
import failureResponse from '../../responses/failure.response.js'

const schema = Joi.object({
	id: [
		Joi.string().email(),
		Joi.string().alphanum().min(3).max(30)
	],
	password: Joi
		.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

export default async (req, res, next) => {
	const {id, password} = req.body
	const {error} = schema.validate({id, password})
	if (error) {
		failureResponse(res, error.toString(), httpCodes.BAD_REQUEST)
	} else {
		next()
	}
}