const { OK, NOT_FOUND, NOT_IMPLEMENTED, INTERNAL_SERVER_ERROR, NOT_ACCEPTABLE } = require("http-status")
const { errorMiddle } = require("../middlewares/error.middleware")
const { success } = require("../middlewares/success.middleware")
const { loginWithEmailAndPassword, registerWithEmailAndPassword, registerWithGooglePopUp } = require("../queries/auth.queries")

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const response = await loginWithEmailAndPassword(email, password)
        res.status(OK).json(success(OK, 'login', response, []))

    } catch (error) {
        res.status(NOT_ACCEPTABLE).json(errorMiddle(NOT_ACCEPTABLE, 'login', [], error))
    }
}

const register = async (req, res) => {

    try {

        const { email, password, displayName } = req.body
        const response = await registerWithEmailAndPassword(email, password, displayName)
        res.status(OK).json(success(OK, 'User registered successfully', response, []))

    } catch (error) {
        res.status(NOT_IMPLEMENTED).json(errorMiddle(NOT_IMPLEMENTED, 'login', [], error.message))
    }
}

const registerWithGoogle = async (req, res) => {

    try {
        const response = await registerWithGooglePopUp()
        res.status(OK).json(success(OK, 'User registered successfully', response, []))

    } catch (error) {
        res.status(NOT_IMPLEMENTED).json(errorMiddle(NOT_IMPLEMENTED, 'register', [], error.message))
    }
}


module.exports = {
    login,
    register,
    registerWithGoogle
}