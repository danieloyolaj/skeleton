const usersControllers = require('./users.controllers')

//Service for registering a user
const registerUser = (req, res) => {
  const { firstName, lastName, email, password, phone, birthday } = req.body
  //Validating data
  if(firstName && lastName && email && password && phone && birthday){
    usersControllers.createUser({firstName, lastName, email, password, phone, birthday })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => { res.status(400).json(err.message) })
  } else {
    res.status(400).json({message: 'Missing data. These are the required fields: ', fields: {
      firstName: 'String',
      lastName: 'String',
      email: 'example@example.com',
      password: 'String',
      phone: '+59174125896',
      birthday: 'YYYY/MM/DD'
    }})
  }
}

//Service for getting all the users
const getAllUsers = (req, res) => {
  usersControllers.getAllUsers()
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(400).json({message: err.message})
    })
}

//Service for getting a user by id
const getUserById = (req, res) => {
  const id = req.params.id
  usersControllers.getUserById(id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(404).json({message: err.message})
    })
}

//Service for patching/updating a user
const patchUser = (req, res) => {
  const id = req.params.id
  const { firstName, lastName, phone, birthday, gender, country } = req.body
  usersControllers.updateUser(id, { firstName, lastName, phone, birthday, gender, country })
    .then(data =>{
      if(data[0]){
        res.status(200).json({message: 'User updated successfully'})
      }else{
        res.status(404).json({message: 'Invalid ID'})
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
}

//Service for deleting a user
const deleteUser = (req, res) => {
  const id = req.params.id
  usersControllers.deleteUser(id)
    .then(data => {
      if(data){
        res.status(204).json()
      }else{
        res.status(404).json({message: 'Invalid ID'})
      }
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
}

//My user service
const getMyUser = (req, res) => {
  const id = req.user.id//This contains the info of the unencrypted token
  usersControllers.getUserById(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
}

//Protected service for patching my own user
const patchMyUser = (req, res) => {
  const id = req.user.id
  const { firstName, lastName, phone, birthday, gender, country } = req.body
  usersControllers.updateUser(id, { firstName, lastName, phone, birthday, gender, country })
    .then(() =>{
        res.status(200).json({message: 'User updated successfully.'})
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
}

//Protected service for deleting my own user
//In this case there are two types of delete: 
//1. Through an administrator
//2. An admin

const deleteMyUser = (req, res) => {
  const id = req.user.id
  usersControllers.updateUser(id, {status: 'inactive'})
    .then(() => {
      res.status(200).json({message: 'User updated deleted.'})
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
}

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  patchUser,
  deleteUser,
  getMyUser,
  patchMyUser,
  deleteMyUser
}