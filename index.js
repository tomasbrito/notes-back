const express = require('express')
const cors = require('cors')
const router = require('./routes')

const app = express()
const port = process.env.port || 80


// Configurar las opciones de CORS
const corsOptions = {
  origin: true,
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Usar el middleware de CORS
app.use(cors(corsOptions));

app.use(
    express.urlencoded({
        extended: true
    }))

app.use(express.json({
    type: '*/*'
}))

app.use(router)


app.listen(port, () => {
    console.log(`Ejecutando en puerto ${port}`)
})