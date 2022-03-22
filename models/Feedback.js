const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({

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

    username: 
    {
        type: String,
        required: [true, 'Please enter your valid email address for username']
    },

    mobile: 
    {
        type: String,
        required: [false, 'You can provide your mobile number or not']
    },

    subject: 
    {
        type: String,
        required: [true, 'Please enter the subject for your feedback']
    },

    message: 
    {
        type: String,
        required: [true, 'Please type your message within 500 characters']
    },

    star: 
    {
        type: String,
        required: [true, 'Choose your rating 5 stars as best, 1 star as worst']
    }
})

// feedbackSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.mobile = await bcrypt.hash(this.mobile, salt)
//     next()
// })

const Feedback = mongoose.model('feedback', feedbackSchema)

module.exports = Feedback

