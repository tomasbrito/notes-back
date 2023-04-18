const express = require('express')
const cors = require('cors')
const router = require('./routes')

const app = express()
const port = process.env.port || 80

app.use(
    express.urlencoded({
        extended: true
    }))

app.use(express.json({
    type: '*/*'
}))

app.use(router)

app.use(cors())

app.listen(port, () => {
    console.log(`Ejecutando en puerto ${port}`)
})