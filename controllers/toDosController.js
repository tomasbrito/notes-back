const { OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require("http-status")
const { errorMiddle } = require("../middlewares/error.middleware")
const { success } = require("../middlewares/success.middleware")
const { db, admin, firebase } = require('../queries/database')
const { postToDo, fetchToDos, deleteToDo, saveChangesToDo } = require("../queries/todos.query")

const getTodosByUser = async (req, res) => {
    try {
        const response = await fetchToDos(req.user)
        res.status(OK).json(success(OK, 'msg', response, []))

    } catch (error) {
        res.status(NOT_FOUND).json(errorMiddle(NOT_FOUND, 'Msg', [], error.message))
    }
}

const addToDo = async (req, res) => {
    try {
        const response = await postToDo(req.body)
        res.status(OK).json(success(OK, 'msg', response, []))
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json(errorMiddle(INTERNAL_SERVER_ERROR, 'msg', [], error.message))
    }

}

const removeToDo = async (req, res) => {
    try {
        const response = await deleteToDo(req.body)
        console.log(response)
        res.status(OK).json(success(OK, 'msg', response, []))
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json(errorMiddle(INTERNAL_SERVER_ERROR, 'msg', [], error.message))
    }
}

const modifyToDo = async (req, res) => {
    try {
        const response = await saveChangesToDo(req.body)
        res.status(OK).json(success(OK, 'msg', response, []))
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json(errorMiddle(INTERNAL_SERVER_ERROR, 'msg', [], error.message))
    }
}


module.exports = {
    getTodosByUser,
    addToDo,
    removeToDo,
    modifyToDo
}