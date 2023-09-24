import {EntitySchema} from 'typeorm'

export default new EntitySchema({
	name: 'Session',
	tableName: 'sessions',
	columns: {
		id: {
			primary: true,
			type: 'int',
			generated: true
		},
		user_id: {
			type: 'varchar'
		},
		token_type: {
			type: 'varchar'
		},
		token: {
			type: 'varchar'
		},
		created_at: {
			type: 'bigint'
		},
		active_at: {
			type: 'bigint'
		},
		expire_at: {
			type: 'bigint'
		}
	}
})