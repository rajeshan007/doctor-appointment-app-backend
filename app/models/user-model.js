const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    password: String,
    role: {
        type: String,
        enum: ['user', "admin", 'doctor'],
        default: 'user' 
    },
})

const User = model('User', userSchema)

module.exports = User