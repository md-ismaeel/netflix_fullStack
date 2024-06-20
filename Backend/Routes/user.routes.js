const express = require("express");

const { userSignUp, sinIn, logoutUser } = require('../Controller/userController');
const { authenticateUser } = require("../Middleware/userMiddleware")

const userRoutes = express.Router();

userRoutes.post('/register', userSignUp)
userRoutes.post('/login', sinIn)
userRoutes.post("/logout", authenticateUser, logoutUser)

module.exports = userRoutes;