import express from 'express'
import authRouter from './auth/auth-router/authRouter'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/chat-app/application', authRouter)

module.exports = app