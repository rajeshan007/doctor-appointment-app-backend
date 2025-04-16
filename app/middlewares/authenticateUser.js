const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (token) {
            const tokenData = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = tokenData
            next()
        } else {
            res.json({ errors: 'token is required' })
        }
    } catch (e) {
        res.json(e)
    }
}

module.exports = authenticateUser