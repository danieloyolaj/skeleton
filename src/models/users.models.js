const db = require('../utils/database')
const { DataTypes } = require('sequelize')

//Model has to be in Uppercase and in plural form
const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
				unique: true,
				validate: {
					isEmail: true
				}
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
			allowNull: false
    },
    gender: {
			type: DataTypes.STRING,
			allowNull: true
    },
    role: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'normal'
    },
    country: {
			type: DataTypes.STRING,
			allowNull: true
    },
    phone: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
    },
    status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'active'
    },
    isVerified:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			field: 'is_verified'
    }
})

module.exports = Users