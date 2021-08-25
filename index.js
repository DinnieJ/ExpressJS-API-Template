require('dotenv').config({ path: `${__dirname}/.env` })

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

let app = express()

//Application start logger
console.log('\x1b[31m%s\x1b[0m', '*******************************************')
console.log('\x1b[35m%s\x1b[1m','Starting Application..')
console.log(`Application name: ${process.env.APP_TITLE || 'ExpressJS API'} `)
console.log(`Mode: ${process.env.NODE_ENV}`)
console.log(`Version: ${process.env.VERSION || 0} `)
console.log('\x1b[0m\x1b[31m%s\x1b[0m', '*******************************************')

if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev')) //logger
    app.use(cors()) //open cors for every origins
}

if(require('./config/cors').origin === '*') {
    app.use(cors())
}

app.use(express.static('public'))

const port = process.env.PORT || 8080


require('./utils/database/mongodb')()

app.listen(port)


console.log('\x1b[32m%s\x1b[0m','Status: OK')
console.log('\x1b[36m%s\x1b[0m',`App is listening at port ${port}`)

