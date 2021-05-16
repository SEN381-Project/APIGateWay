const mongoose = require('mongoose')
const { followup } = require('../routes/followUpRoute')


const followupSchema = new mongoose.Schema({
    // ID: {
    //     type: string,
    //     required: true
    // },
    FollowupStatus: {
        type: String,
        required: true
    },
    FollowupDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('followupObj', followupSchema)
