import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as exphbs from 'express-handlebars'
import routes from './controllers'
import * as helmet from 'helmet'
import * as xdebug from 'debug'

const app = express()
const debug = xdebug('cd:index')

if(process.env.NODE_ENV != 'production') { // not in production. Need express to serve static files
	app.use('/assets', express.static(path.join(__dirname, 'assets')))
} else {
	// set up debug variables
	process.env.DEBUG = "cd:*"
	process.env.DEBUG_COLORS = 'true'
}
// nginx is configured for static assets

app.engine('.hbs', exphbs({
	extname: '.hbs',
	helpers: {
		inc: function(value, options) {
		    return parseInt(value) + 1;
		}
	}
}))
app.set('view engine', '.hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app) // register route

app.use(helmet())

app.listen(1337, () => debug('Server up and running at localhost:1337'))