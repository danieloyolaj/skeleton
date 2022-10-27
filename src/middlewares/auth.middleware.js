//Middleware to protect routes

//1. Check if there's a token
//2. Verify if the token belongs to a valid user
//3. Modify the request and add req.user with the token info unencrypted 
//A strategy is a type of authentication that passport uses

const { jwtSecret } = require('../config')
const { getUserById } = require('../users/users.controllers')
const JwtStrategy = require('passport-jwt').Strategy //It handles strategies for authenticating
const ExtractJwt = require('passport-jwt').ExtractJwt //Extracts the headers from the request

//Exporting an annonymous function
module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
  }

  passport.use(
    new JwtStrategy(options, async (decoded, done) => {
      //done receives (error, decoded)
      try {
        const response = await getUserById(decoded.id)
        if(!response){
          return done(null, false)
        }
        console.log('decoded JWT', decoded)
        return done(null, decoded)
      } catch (error) {
        return done(error, false)
      }
    })
  )

}