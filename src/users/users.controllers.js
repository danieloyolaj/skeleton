const Users = require('../models/users.models')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')


//Get all users
const getAllUsers = async () => {
	const data = await Users.findAll({
		where: {
			status: 'active'
		}
	})
}

//Get user by id
const getUserById = async (id) => {
	const data = await Users.findOne({ 
		where: {
			id: id,
			status: 'active'
		}
	})
	return data
}

//Get user by email
const getUserByEmail = async (email) => {
	const data = await Users.findOne({
		where: {email: email, status: 'active'}
	})
	return data
}

//Creating a user
const createUser = async (data) => {
	const newUser = await Users.create({
		id: uuid.v4(),
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		password: hashPassword(data.password),
		phone: data.phone,
		birthday: data.birthday,
		gender: data.gender, 
		country: data.country
	})
	return newUser
}

//Updating a user
const updateUser = async (id, data) => {
	const result = await Users.update(data, { where: {id} })
	return result
}

//Deleting a user
const deleteUser = async (id) => {
	const data = await Users.destroy(data, { where: {id} })
	return data
}


module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	getUserByEmail,
	updateUser,
	deleteUser
}