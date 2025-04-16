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




// const doctorSchema = new Schema({
//     firstName: String,
//     lastName: String,
//     specialization: String,
//     mobileNumber: Number,
//     adress: String,
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     feesPerConsultation: Number,
//     experience: String,
//     status: {
//         type: String,
//         enum: ['available', 'notAvailable']
//     },
//     timings: [{
//         day: {
//             type: String,
//             enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
//         },
//         startTime: String,    // Example: "09:00 AM"
//         endTime: String       // Example: "06:00 PM"
//     }]
// })  do the front code in very simple way and without css