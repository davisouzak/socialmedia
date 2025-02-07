const express = require('express')
const userRoutes = require('./routes/userRoutes')
const userModel = require('./models/userModel')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

userModel.createTable()

app.use(userRoutes)

const port = 3000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})
