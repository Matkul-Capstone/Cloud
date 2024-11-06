const asyncHandler = require('express-async-handler');
const getCompletedSentencesSQL = require('../services/getCompletedSentences');
const getSentencesByTypeSQL = require('../services/getSentencesByType');
const getSentenceSQL = require('../services/getSentence');

exports.getSentencesByUser = asyncHandler(async (req, res, next) => {
    try {
        const completedSentences = await getCompletedSentencesSQL(req.params.uid, req.params.type);

        const sentences = await getSentencesByTypeSQL(req.params.type);

        const results = [];
        sentences.forEach(item => {
            const found = completedSentences.find(element => element.sentence === item.sentence);
            const completed = found ? found.completed : 0;
            results.push({ ...item, completed });
        });

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully get sentences.',
            'data': results
        });
    } catch (error) {
        next(error);
    }
})

exports.getSentenceDetail = asyncHandler(async (req, res, next) => {
    try {
        const sentenceData = await getSentenceSQL(req.params.sid);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully get sentence detail.',
            'data': {
                'sentence_id': sentenceData.sentence_id,
                'sentence_type': sentenceData.sentence_type,
                'sentence': sentenceData.sentence,
                'audio': 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=' + sentenceData.sentence
            }
        });
    } catch (error) {
        next(error)
    }
})