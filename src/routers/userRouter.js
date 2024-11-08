const express = require('express');
const checkRequiredFields = require('../middleware/checkRequiredFields');
const userController = require('../controllers/userController');
const userRoute = express.Router();

userRoute.get(('/:uid'), userController.getUser);
userRoute.post(('/register'), checkRequiredFields('email', 'password'), userController.registerUser);
userRoute.post(('/login'), checkRequiredFields('email', 'password'), userController.loginUser);
userRoute.put(('/:uid/username'), checkRequiredFields('newUsername'), userController.changeUsername);
userRoute.put(('/:uid/password'), checkRequiredFields('email'), userController.resetPassword);
userRoute.put(('/:uid/type'), checkRequiredFields('userType'), userController.changeUserType);

module.exports = userRoute;