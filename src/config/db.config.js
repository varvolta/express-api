import {DataSource} from 'typeorm'
import Session      from '../entities/session.js'
import User         from '../entities/user.js'
import File         from '../entities/file.js'

export default new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'password',
	database: 'express-api',
	logging: false,
	synchronize: true,
	entities: [User, File, Session]
})