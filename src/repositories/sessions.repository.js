import dataSource from '../config/db.config.js'
import Session    from '../entities/session.entity.js'

export default dataSource.getRepository(Session)