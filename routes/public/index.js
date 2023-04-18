const { Router } = require("express");
const  controller  = require("../../controllers/user.controller");

const router = Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/register', controller.registerWithGoogle)

module.exports = router
