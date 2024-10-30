const asyncHandler = require('express-async-handler');
const postLogsSQL = require('../services/postLogs');
const getLogsSQL = require('../services/getLogs');

exports.postLogs = asyncHandler(async (req, res) => {
    try {
        const postLogsResponse = await postLogsSQL(req.params.uid, req.params.sid, req.body.completed);

        if (postLogsResponse.status === 'fail'){
            res.status(400).json(postLogsResponse);
        }

        res.status(200).json({
            'status': 'success',
            'message': postLogsResponse
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': error.message,
        });
    }
})

exports.getLogs = asyncHandler(async (req, res) => {
    try {
        const getLogsResponse = await getLogsSQL(req.params.uid);

        if (getLogsResponse.status === 'fail'){
            res.status(400).json(getLogsResponse);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'berhasil get logs',
            'data': getLogsResponse
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': error.message,
        });
    }
})