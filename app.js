const express = require('express')
const path = require('path')
const passport = require('passport')
const dotenv = require('dotenv')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const post = require('./routes/post')
const auth = require('./routes/auth')
const index = require('./routes/index')
const Post = require('./models/post')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Express app
const app = express()

// Port number
const PORT1 = process.env.PORT || 3000

// Connect to MongoDB
connectDB()

// Register view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))

Post.find()
.then((result) => {
	console.log("shit worked")
	result.forEach(post =>{
		const d1 = post.createdAt.getTime();
		const d2 = new Date().getTime();
		const diff = d2 - d1;
		const days = diff/(1000*60*60*24);
		console.log(days)
		if(days > 2)	{
			Post.find( {_id: post._id} )
			.remove()
			.then((result1) => {
				//console.log(result1)
			})
			.catch((err) => {
				console.log(err)
			})			
		}
	} )
})

// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
)

// Passport and express middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded())

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))



// Routes
app.use('/messages', post)
app.use('/auth', auth)
app.use('/', index)

// 404
app.use((req, res) => {
	res.status(404).render('404', { title: 'Page not found' })
})

// Listen for requests
app.listen(PORT1, () => {
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT1}`)
})
