import dataSource from '../config/db.config.js'
import File       from '../entities/file.entity.js'

export default dataSource.getRepository(File)