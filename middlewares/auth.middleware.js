const { getAuth } = require('firebase/auth')
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status')
const { errorMiddle } = require('./error.middleware')
const { admin } = require('../queries/database')

const authorization = (req, res, next) => {
    const header = req.header('Authorization')
    if (!header) {
        return res.status(UNAUTHORIZED).json(errorMiddle('No token', UNAUTHORIZED))
    } else {
        const auth = getAuth()
        const token = header.replace('Bearer', '').trim()
        var user = auth.currentUser

        if (user) {
            admin.auth().verifyIdToken(token)
                .then(decodedToken => {
                    if (decodedToken.uid === user.uid) {
                        req.user = user.uid
                        return next()
                    } else { 
                        return res.status(UNAUTHORIZED).json(errorMiddle('Token error', UNAUTHORIZED))
                    }
                })
                .catch(error => {
                    return res.status(INTERNAL_SERVER_ERROR).json(errorMiddle(error, INTERNAL_SERVER_ERROR));
                })
        } else {
            return res.status(UNAUTHORIZED).json(errorMiddle('Token expired', UNAUTHORIZED))
        }
    }
}

module.exports = {
    authorization
}