const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({

    firstName: 
    {
        type: String,
        required: [true, 'Please enter valid name']
    },

    lastName: 
    {
        type: String,
        required: [true, 'Please write down your real last name']
    },

    email: 
    {
        type: String,
        required: [true, 'Please write down your email for contact']
    },

    messages: 
    {
        type: String,
        required: [true, 'Please provide your messages']
    }
})

contactSchema.pre('save', async function(next) {
    next()
})

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact

