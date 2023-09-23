import dataSource from './config/db.config.js'
import express    from 'express'
import cors       from 'cors'
import bodyParser from 'body-parser'
import routes     from './routes/index.js'

const app = express()
const port = 3000

app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', routes)

dataSource
	.initialize()
	.then(async () => {
		console.log('DB Initialized')
		app.listen(port, () => {
			console.log('Server started')
		})
	})
	.catch(error => {
		console.log('Error: ', error)
		process.exit(1)
	})