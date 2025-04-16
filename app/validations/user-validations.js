
const User = require('../models/user-model')

const firstNameSchema = {
    notEmpty: {
        errorMessage: 'firstname is required'
    }
}
const lastNameSchema = {
    notEmpty: {
        errorMessage: 'lastname is required'
    }
}

const emailSchema = {
    notEmpty: {
        errorMessage: 'email is required'
    },
    isEmail: {
        errorMessage: "invalid email"
    },
    custom: {
        options: async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error('email is already registered')
            } else {
                return true
            }
        }
    }

}


const mobielSchema = {
    notEmpty: {
        errorMessage: 'mobile number is required'
    },
    isLength: {
        errorMessage: 'mobile number must be 10 digits',
        options: { min: 10, max: 10 }

    },
    isNumeric: {
        errorMessage: 'enter only numbers'
    },
    custom: {
        options: async (value) => {
            const existingMobileNumber = await User.findOne({ mobile: value });
            if (existingMobileNumber) {
                throw new Error('mobile number is already registered')
            } else {
                return true
            }
        }
    }

}

const passwordSchema = {
    notEmpty: {
        errorMessage: 'password is required'
    },
    isLength: {
        errorMessage: 'password should between 8 to 128 characters',
        options: { min: 3, max: 128 }

    }
}




const emailLoginSchema = {
    notEmpty: {
        errorMessage: 'email is required'
    },
    isEmail: {
        errorMessage: "invalid email"
    },
}




const userRegistrationSchema = {
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    mobile: mobielSchema,
    password: passwordSchema,
    
}

const userLoginSchema = {
    email: emailLoginSchema,
    password: passwordSchema
}


module.exports = {
    userRegistrationSchema,
    userLoginSchema
}