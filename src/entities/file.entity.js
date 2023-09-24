import {EntitySchema} from 'typeorm'

export default new EntitySchema({
	name: 'File',
	tableName: 'files',
	columns: {
		id: {
			primary: true,
			type: 'int',
			generated: true
		},
		user_id: {
			type: 'varchar'
		},
		name: {
			type: 'varchar'
		},
		extension: {
			type: 'varchar',
			nullable: true
		},
		mime: {
			type: 'varchar'
		},
		size: {
			type: 'bigint'
		},
		uploaded_at: {
			type: 'bigint'
		}
	}
})