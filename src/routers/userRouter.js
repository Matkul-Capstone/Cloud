const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

userRoute.get(('/:uid'), userController.getUser);
userRoute.post(('/register'), userController.registerUser);
userRoute.post(('/login'), userController.loginUser);
userRoute.put(('/:uid/username'), userController.changeUsername);
userRoute.put(('/:uid/password'), userController.resetPassword);
userRoute.put(('/:uid/type'), userController.changeUserType);

module.exports = userRoute;