const express = require('express');
const checkRequiredFields = require('../middleware/checkRequiredFields');
const logController = require('../controllers/logController');
const logRoute = express.Router();

logRoute.get(('/:uid'), logController.getLogs);
logRoute.post(('/:uid/:sid'), checkRequiredFields('score', 'completed', 'timestamp'), logController.postLogs);

module.exports = logRoute;