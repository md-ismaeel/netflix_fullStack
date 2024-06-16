const express = require("express");

const { userSignUp, sinIn, logoutUser } = require('../Controller/userController');
const passport = require('../Middleware/userMiddleware')

const userRoutes = express.Router();

userRoutes.post('/register', userSignUp)
userRoutes.post('/login', sinIn)
userRoutes.post('/logout', passport.authenticate("jwt", { session: false }), logoutUser)

console.log("hello");

module.exports = userRoutes;