require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL3, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())



// const reminderRouter = require('./routes/reminderRoute')
// app.use('/reminderRoute', reminderRouter)

// const feedbackRouter = require('./routes/feedbackRoute')
// app.use('/feedbackRoute', feedbackRouter)

const followUpRouter = require('./routes/followUpRoute')
app.use('/followUpRoute', followUpRouter)

app.listen(3000, () => console.log('Server Started'))