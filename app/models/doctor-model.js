const mongoose = require('mongoose')
const { Schema, model } = mongoose

const doctorSchema = new Schema({
    firstName: String,
    lastName: String,
    specialization: String,
    mobileNumber: Number,
    adress: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    feesPerConsultation: Number,
    timings: [String],
    experience: String,
    status: {
        type: String,
        enum: ['available', 'notAvailable'],
        req: true
    }

})

const Doctor = model('Doctor', doctorSchema)

module.exports = Doctor




