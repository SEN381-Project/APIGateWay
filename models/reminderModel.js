const mongoose = require('mongoose')
const { reminder } = require('../routes/reminderRoute')


const reminderSchema = new mongoose.Schema({
    // ID: {
    //     type: string,
    //     required: true
    // },
    ReminderText: {
        type: String,
        required: true
    },
    ReminderDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('ReminderObj', reminderSchema)
