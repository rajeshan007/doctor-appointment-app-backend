const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { checkSchema } = require('express-validator')
const configureDb = require('./config/db')

configureDb()

app.use(express.json())
app.use(cors())

const userControllers = require('./app/controllers/user-controller')
const { userRegistrationSchema, userLoginSchema } = require('./app/validations/user-validations')
const authenticateUser = require('./app/middlewares/authenticateUser')
const authorizeUser = require('./app/middlewares/authorizeUser')

app.post('/api/user/register', checkSchema(userRegistrationSchema), userControllers.register)
app.post('/api/user/login', checkSchema(userLoginSchema), userControllers.login)
app.get('/api/user/getProfile', authenticateUser, authorizeUser(['admin', 'user']), userControllers.getProfile)
app.get('/api/user/list', authenticateUser, authorizeUser(['admin']), userControllers.list)
app.put('/api/users/update/:id', authenticateUser, authorizeUser(['user', 'admin']), userControllers.updateProfile)




app.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT);
})