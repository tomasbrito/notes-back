const { Router } = require("express");
const public = require('./public')
const private = require('./private')

const router = Router()

router.get('/', (req, res) => {
    res.send({ ok: true })
})

router.use('/public', public)
router.use('/private', private)

module.exports = router