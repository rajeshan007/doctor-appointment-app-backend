const User = require('../models/user-model')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

userControllers = {}

userControllers.register = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const user = new User(body)
        const totalUsers = await User.countDocuments()
        if (totalUsers == 0) {
            user.role = "admin"
        }
        if (body.role === 'admin') {
            user.role = 'user'
        }
        const salt = await bcryptjs.genSalt()
        const hashedPasword = await bcryptjs.hash(body.password, salt)
        user.password = hashedPasword
        await user.save()
        res.json(user)

    } catch (e) {

        res.status(400).json({ errors: 'register failed' })
    }
}


userControllers.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const user = await User.findOne({ email: body.email })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'user not found' }] })
        }
        const result = await bcryptjs.compare(body.password, user.password)
        if (!result) {
            return res.status(400).json({ errors: [{ msg: 'invalid email/password' }] })
        }
        const tokenData = { _id: user._id, role: user.role }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET)
        res.status(200).json({ token })

    } catch (e) {
        res.status(500).json({ errors: 'login failed' })
    }

}

// if loggedin person is user then only he can access his profile and if logged person is admin he can aceess all the users profile
userControllers.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.json(_.pick(user, ['id', 'firstName', 'lastName', 'email', 'mobile', 'role']))
    } catch (e) {
        res.status(500).json({ errors: 'cannot get profile' })
    }
}

// list all the users
userControllers.list = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(500).json({ errors: 'cannot get users' })
    }
}


// id role is user then only update his profile or role is admin then update anybodys profile
userControllers.updateProfile = async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        if (req.user.role === 'user') {
            const user = await User.findOneAndUpdate({ _id: req.user._id, role: req.user.role }, body, { new: true })
            res.json(user)
        } else if (req.user.role === 'admin') {
            const user = await User.findByIdAndUpdate(id, body, { new: true })
            res.status(200).json(user)
        }
    } catch (e) {
        res.status(500).json({ errors: 'cannot update users' })
    }
}

module.exports = userControllers