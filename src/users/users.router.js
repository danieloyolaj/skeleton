const router = require('express').Router()
const passport = require('passport')
const userServices = require('./users.services')
const adminValidate = require('../middlewares/role.middleware')
require('../middlewares/auth.middleware')(passport)

//Route /auth/register
//Protected routes
//1. import passport
//2 require ../middleware/auth.middleware

//Root routes
router.get('/', userServices.getAllUsers)

//Route of the logged user
//These routes area protected
router.route('/me')
  .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
  .patch(passport.authenticate('jwt', {session: false}), adminValidate, userServices.patchMyUser) 
  .delete(passport.authenticate('jwt', {session: false}), adminValidate, userServices.deleteMyUser) 
  // .put() //Challenge: Do this for monday

//Dynamic routes by id
router.route('/:id')
  .get(userServices.getUserById)
  .patch(passport.authenticate('jwt', {session: false}), userServices.patchMyUser)
  .delete(passport.authenticate('jwt', {session: false}), userServices.deleteMyUser)




module.exports = router