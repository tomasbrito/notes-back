const { Router } = require("express");
const { addToDo, getTodosByUser, removeToDo, modifyToDo } = require("../../controllers/toDosController");
const { authorization } = require('../../middlewares/auth.middleware')

const router = Router()

router.route('/toDosById/')
    .get(authorization, getTodosByUser)

router.route('/addTodo')
    .post(authorization, addToDo)

router.route('/modifyToDo')
    .put(authorization, modifyToDo)

router.route('/deleteToDo')
    .put(authorization, removeToDo)

module.exports = router