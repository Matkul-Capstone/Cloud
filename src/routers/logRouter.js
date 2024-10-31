const express = require('express');
const logController = require('../controllers/logController');
const logRoute = express.Router();

logRoute.get(('/:uid'), logController.getLogs);
logRoute.post(('/:uid/:sid'), logController.postLogs);

module.exports = logRoute;