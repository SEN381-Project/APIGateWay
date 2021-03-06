require('dotenv').config()
const cors = require('cors');

const express = require('express')
const app = express()
app.use(cors());
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())



// const reminderRouter = require('./routes/reminderRoute')
// app.use('/reminderRoute', reminderRouter)

//we deleted covid!!!!
// const feedbackRouter = require('./routes/feedbackRoute')
// app.use('/feedbackRoute', feedbackRouter)

const followUpRouter = require('./routes/followUpRoute')
app.use('/db', followUpRouter)

app.listen(3000, () => console.log('Server Started'))