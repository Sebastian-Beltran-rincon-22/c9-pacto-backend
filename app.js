const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const user = require ('./routers/users/user')
const publication = require ('./routers/PublicationsRou/publications')
const admin = require('./routers/users/auth')
const rolAdmin = require ('./libs/initialSetup')


const app = express()
rolAdmin.createAdmin()
rolAdmin.adminprint()

app.use(cors({
    origin:"*",
    methods:"GET,HEAD,POST,PATCH,PUT,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/poofo',user)
app.use('/publictpoofo',publication)
app.use('/admins',admin)


module.exports = app
