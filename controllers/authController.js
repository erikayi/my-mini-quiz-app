const User = require("../models/User")
const jwt = require('jsonwebtoken')
const Feedback = require("../models/Feedback")

// handle errors 
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }

    // if name is incorrect...
    if (err.message === 'incorrect name') {
        errors.name = 'That name does not exist'
    }

    // if email is incorrect...
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered'
    }

    // if password is incorrect...
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect'
    }

    // if name is duplicated...
    if (err.message === 11000) {
        errors.name = 'That name is already registered'
        return errors
    }

    // if email is duplicated...
    if (err.message === 11000) {
        errors.email = 'That email is already registered'
        return errors
    }

    // validate errors
    if (err.message.includes('user validation failed')) {
        // console.log(err)
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val)
            // console.log(properties)
            errors[properties.path] = properties.message
        })
    }
    return errors
}

// create json web token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'yellow minions secret', {
        expiresIn: maxAge
    })
}

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    }
    catch (err) { 
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

module.exports.sql_get = (req, res) => {
    res.render('sql_test')
}

module.exports.css_get = (req, res) => {
    res.render('css_test')
}

module.exports.css_get = (req, res) => {
    res.render('html_test')
}

module.exports.feedback_get = (req, res) => {
    res.render('feedback')
}

module.exports.feedback_put = (req, res) => {
    const feedbackData = req.body;
    const newFeedbackPosts = new Feedback(feedbackData);

    newFeedbackPosts.save((error) => {
        if (error) {
            res.status(400).json({ message: 'Bad luck on internal server errors'});
        } else {
            // post the feedback onto our database
            res.json({
                message: 'Your feedback has been saved.'
            })
        }
    })
}

module.exports.contact_get = (req, res) => {
    res.render('contact')
}

module.exports.contact_put = (req, res) => {
    const contactSupport = req.body;
    const newcontactSupport = new Contact(contactSupport);

    newcontactSupport.save((err) => {
        if (err) {
            res.status(400).json({ message: 'Please enter a valid name, email, and message'})
        } else {
            res.json({
                message: 'Your message has been sent. We will get back to you asap!'
            })
        }
    })
}

module.exports.admin_get = (req, res) => {
    res.render('admin')
}

module.exports.admin_post = (req, res) => {
    req.body;
}