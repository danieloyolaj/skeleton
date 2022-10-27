//Dependencies
const express = require('express')
const db = require('./utils/database')
const initModels = require('./models/initModels')

//Files
const {port} = require('./config')

//Routes
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

//Initial configs
const app = express()

app.use(express.json())

//Database authentication
db.authenticate()
    .then(() =>{
        console.log('Database authenticated')
    })
    .catch( err => {
        console.log(err)
    })

db.sync()
    .then(() =>{
        console.log('Database synced')
    })
    .catch( err => {
        console.log(err)
    })

initModels()
//A middleware is a function that executes a request before another callback


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users/`
    })
})


app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})