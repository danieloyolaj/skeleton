const { Sequelize } = require('sequelize')
const config = require('../config')

const db = new Sequelize({
    dialect: 'postgres',
    host: config.db.host, //env variable for the host
    username: config.db.username, //env variable for the username
    password: config.db.password, //env variable for the password
    database: config.db.dbName //env variable for the database name
})

module.exports = db