// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["https://ezmaker-bfcd6.web.app", "http://localhost:4000", "http://localhost:3000", "http://localhost:3001", "https://sbu-ezmaker.com" ],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const ezmakerRouter = require('./routes/ezmaker-router')
app.use('/', ezmakerRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


