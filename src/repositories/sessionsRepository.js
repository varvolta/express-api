import dataSource from '../config/db.config.js'
import Session    from '../entities/session.js'

export default dataSource.getRepository(Session)