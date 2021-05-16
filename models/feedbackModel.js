const mongoose = require('mongoose')
const { feedback } = require('../routes/feedbackRoute')


const feedbackSchema = new mongoose.Schema({
    // ID: {
    //     type: string,
    //     required: true
    // },
    Problem: {
        type: String,
        required: true
    },
    HelpedOnTime: {
        type: Boolean,
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    FeedbackDate : {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('feedbackObj', feedbackSchema)
