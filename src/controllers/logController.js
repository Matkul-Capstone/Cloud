const asyncHandler = require('express-async-handler');
const postLogsSQL = require('../services/postLogs');
const getLogsSQL = require('../services/getLogs');

exports.postLogs = asyncHandler(async (req, res, next) => {
    try {
        const postLogsResponse = await postLogsSQL(req.params.uid, req.body.chapter, req.params.sid, req.body.score, req.body.completed, req.body.timestamp);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': postLogsResponse
        })
    } catch (error) {
        next(error);
    }
})

exports.getLogs = asyncHandler(async (req, res, next) => {
    try {
        const getLogsResponse = await getLogsSQL(req.params.uid);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully get logs.',
            'data': getLogsResponse
        })
    } catch (error) {
        next(error);
    }
})