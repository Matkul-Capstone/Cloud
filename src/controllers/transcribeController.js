const asyncHandler = require('express-async-handler');
const FormData = require('form-data');
const postMachineLearning = require('../services/postMachinelearning');
const postLogs = require('../services/postLogs');


exports.postTranscribe = asyncHandler(async (req, res, next) => {
    try {
        var completed = false;

        audio_file = new FormData();

        audio_file.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        const response = await postMachineLearning(req.body.sentence, audio_file);

        if(response.data.accuracy === 100){
            completed = true;
        }

        await postLogs(req.body.uid, req.body.chapter, req.params.sid, response.data.accuracy, completed, req.body.timestamp)

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully transcribed audio file.',
            'data': {
                'uid': req.body.uid,
                'chapter': req.body.chapter,
                'sid': req.params.sid,
                'timestamp': req.body.timestamp,
                'sentence': req.body.sentence,
                'score': response.data.accuracy,
                'correct_words': response.data.correct_words,
                'wrong_words': response.data.wrong_words,
                'completed': completed
            }
        });
    } catch (error) {
        next(error);
    }
})