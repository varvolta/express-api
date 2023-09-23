import dataSource from '../config/db.config.js'
import User       from '../entities/user.js'

export default dataSource.getRepository(User)