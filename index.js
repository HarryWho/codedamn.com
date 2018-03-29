const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const exphbs = require('express-handlebars')
const routes = require('./others/routes')
const helmet = require('helmet')
const debug = require('debug')('cd:index')

if(process.env.NODE_ENV != 'production') { // not in production. Need express to serve static files
	app.use('/assets', express.static(path.join(__dirname, 'assets')))
} else {
	// set up debug variables
	process.env.DEBUG = "cd:*"
	process.env.DEBUG_COLORS = true
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
app.use('/', routes)
app.use(helmet())

app.listen(1337, () => debug('Server up and running at localhost:1337'))