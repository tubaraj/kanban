const express = require('express')
require('dotenv').config();
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => {
    console.error(error)
})
db.once('open', () => console.log('Connected to Database'))

app.use(cors());
app.use(express.json())

const kanbanRoutes = require('./routes/kanban')
app.use('/kanban', kanbanRoutes)

app.listen(8080, () => console.log('Server Started'))