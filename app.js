const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middleware/authMiddleware')

const app = express()

// our middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// our view engine
app.set('view engine', 'ejs')

// connect to our database
const dbURI = "URI GOES HERE"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => app.listen(3000))
        .catch((err) => console.log(err))

// our routes
app.get('/', (req, res) => res.render('home'));
app.get('/tests', requireAuth, (req, res) => res.render('tests'))
app.use(authRoutes)

