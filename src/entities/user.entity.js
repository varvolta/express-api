import {EntitySchema} from 'typeorm'

export default new EntitySchema({
	name: 'User',
	tableName: 'users',
	columns: {
		id: {
			primary: true,
			type: 'varchar',
			unique: true
		},
		password: {
			type: 'varchar'
		},
		created_at: {
			type: 'bigint'
		}
	}
})