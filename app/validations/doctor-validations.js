const doctorControllerSchema = {
    firstName: {
        notEmpty: {
            errorMessage: 'firstName is required'
        }
    },
    lastName: {
        notEmpty: {
            errorMessage: 'lastName is required'
        }
    },
    specialization: {
        notEmpty: {
            errorMessage: 'specialization is required'
        }
    },
    address: {
        notEmpty: {
            errorMessage: 'address is required'
        }
    },
    user: {
        isMongoId: {
            errorMessage: 'should be a valid MongoDb Id '
        }
    },
    feesperConsultation: {
        isNumeric: {
            errorMessage: 'enter only numbers',

        },
    },
    experience: {
        notEmpty: {
            errorMessage: 'experience is required'
        }
    },


}

module.exports = doctorControllerSchema