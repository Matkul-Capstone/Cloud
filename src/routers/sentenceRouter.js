const express = require('express');
const sentenceController = require('../controllers/sentenceController');
const sentenceRoute = express.Router();

sentenceRoute.get(('/:type/:uid'), sentenceController.getSentenceByUser);
sentenceRoute.get(('/:sid'), sentenceController.getSentenceDetail);

module.exports = sentenceRoute;