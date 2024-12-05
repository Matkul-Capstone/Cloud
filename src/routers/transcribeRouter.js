const express = require('express');
const multerMiddleware = require('../middleware/multer');
const checkRequiredFields = require('../middleware/checkRequiredFields');
const transcribeController = require('../controllers/transcribeController');
const transcribeRoute = express.Router();

transcribeRoute.post(('/:sid'), multerMiddleware, checkRequiredFields('uid', 'sentence', 'timestamp'), transcribeController.postTranscribe);

module.exports = transcribeRoute;