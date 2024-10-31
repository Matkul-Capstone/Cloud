const asyncHandler = require('express-async-handler');
const getCompletedSentencesSQL = require('../services/getCompletedSentences');
const getSentencesByTypeSQL = require('../services/getSentencesByType');
const getSentenceSQL = require('../services/getSentence');

exports.getSentenceByUser = asyncHandler(async (req, res) => {
    try {
        const completedSentences = await getCompletedSentencesSQL(req.params.uid, req.params.type);
        
        if(completedSentences.status === 'fail'){
            res.status(400).json(completedSentences);
        }

        const sentences = await getSentencesByTypeSQL(req.params.type);

        if(sentences.status === 'fail'){
            res.status(400).json(sentences);
        }

        const results = [];
        sentences.forEach(item => {
            const found = completedSentences.find(element => element.sentence === item.sentence);
            const completed = found ? found.completed : 0;
            results.push({ ...item, completed });
        });

        res.status(200).json({
            'status': 'success',
            'message': 'berhasil get sentences',
            'data': results
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': error.message,
        });
    }
})

exports.getSentenceDetail = asyncHandler(async (req, res) => {
    try {
        const sentenceData = await getSentenceSQL(req.params.sid);

        if(sentenceData.status === 'fail'){
            res.status(400).json(sentenceData);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'berhasil get sentence detail',
            'data': {
                'sentence_id': sentenceData.sentence_id,
                'sentence_type': sentenceData.sentence_type,
                'sentence': sentenceData.sentence,
                'audio': 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=' + sentenceData.sentence
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': error.message,
        });
    }
})