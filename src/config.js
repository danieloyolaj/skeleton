//Dependencies
require('dotenv').config()

const config = {
    port: process.env.PORT || 9000,
    nodeEnv: process.env.NODE_ENV || 'development', //Development, Testing, Production
    jwtSecret: process.env.JWT_SECRET,
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'root',
        dbName: process.env.DB_NAME || 'skeleton'
    }
}

module.exports = config