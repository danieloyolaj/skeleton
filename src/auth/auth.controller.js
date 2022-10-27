const { getUserByEmail } = require("../users/users.controllers")
const { comparePassword } = require('../utils/crypto')

//This controller has 2 possible outcomes
//1. Credentials are valid and we return a user
//2. Credentials are invalid and we return false
const loginUser = async (email, password) => {
  try {
      const user = await getUserByEmail(email)
      const verifyPassword = comparePassword(password, user.password)
      if(verifyPassword){
        return user
      }else{
        return false
      }
    } catch (err) {
        return false
    }
}

// loginUser('sahid.kick@academlo.com', 'root')

module.exports = {
  loginUser
}