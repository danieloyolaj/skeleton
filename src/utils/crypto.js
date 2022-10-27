//This handles all of the password validation and hashing

const bcrypt = require('bcrypt')

//Encrypting the password
const hashPassword = (plainPassword) => {
	return bcrypt.hashSync(plainPassword, 10)
}

console.log(hashPassword('root'))

//Comparing passwords
const comparePassword = (plainPassword, hashedPassword) => {
	return bcrypt.compareSync(plainPassword, hashedPassword)
}


// console.log(comparePassword('root', '$2b$10$4acw/nsHXwTG1uLqvhAiwOFfSC8dUJmERv6oMa6mL5ReBlHUaESCq'))

module.exports = {
	hashPassword,
	comparePassword
}