const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

userRoute.post(('/register'), userController.registerUser);
userRoute.post(('/login'), userController.loginUser);
// userRoute.put(('/:uid/username'), );
// userRoute.put(('/:uid/password'), );

module.exports = userRoute;