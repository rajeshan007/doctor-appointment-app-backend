const authorizeUser = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next()
        } else {
            res.status(404).json({ errors: 'sorry u cannot access this route' })
        }
    }

}

module.exports = authorizeUser