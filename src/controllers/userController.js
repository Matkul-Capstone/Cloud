const asyncHandler = require('express-async-handler');
const getUserSQL = require('../services/getUser');
const registerUserFirebase = require('../services/registerFirebase');
const registerUserSQL = require('../services/registerSQL');
const loginUserFirebase = require('../services/loginFirebase');
const getLogsSQL = require('../services/getLogs');
const resetPasswordUser = require('../services/resetPassword');
const changeUsernameSQL = require('../services/changeUsername');
const changeUserTypeSQL = require('../services/changeUserType');
const changeUserScoreSQL = require('../services/changeUserScore');

exports.getUser = asyncHandler(async (req, res, next) => {
    try {
        const getUserResponse = await getUserSQL(req.params.uid);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully get user.',
            'data': {
                'user_id': getUserResponse.user_id,
                'username': getUserResponse.username,
                'user_email': getUserResponse.user_email,
                'user_type': getUserResponse.user_type,
                'beginner_score': getUserResponse.beginner_score,
                'intermediate_score': getUserResponse.intermediate_score,
                'advance_score': getUserResponse.advance_score
            }
        });
    } catch (error) {
        next(error);
    }
});

exports.registerUser = asyncHandler(async (req, res, next) => {
    try {
        const registerFirebaseResponse = await registerUserFirebase(req.body.email, req.body.password);

        const registerSQLResponse = await registerUserSQL(registerFirebaseResponse.uid, registerFirebaseResponse.email, req.body.username);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully registered new user.',
            'data': {
                'uid': registerFirebaseResponse.uid
            }
        });
    } catch (error) {
        next(error);
    }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    try {
        const loginFirebase = await loginUserFirebase(req.body.email, req.body.password);

        const userData = await getUserSQL(loginFirebase);
        const userLogs = await getLogsSQL(userData.user_id);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully login.',
            'data': {
                'user_id': userData.user_id,
                'username': userData.username,
                'user_email': userData.user_email,
                'user_type': userData.user_type,
                'beginner_score': userData.beginner_score,
                'intermediate_score': userData.intermediate_score,
                'advance_score': userData.advance_score,
                'logs': userLogs
            }
        });
    } catch (error) {
        next(error);
    }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
    try {
        const resetPasswordResponse = await resetPasswordUser(req.body.email);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Please check your email to reset your password.'
        });
    } catch (error) {
        next(error);
    }
});

exports.changeUsername = asyncHandler(async (req, res, next) => {
    try {
        const changeUsernameResponse = await changeUsernameSQL(req.params.uid, req.body.newUsername);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully changed username.',
            'data': {
                'uid': req.params.uid,
                'newUsername': changeUsernameResponse.newUsername
            }
        });
    } catch (error) {
        next(error);
    }
});

exports.changeUserType = asyncHandler(async (req, res, next) => {
    try {
        const changeUserTypeResponse = await changeUserTypeSQL(req.params.uid, req.body.userType);

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully changed user type.',
            'data': {
                'uid': req.params.uid,
                'userType': changeUserTypeResponse.userType
            }
        });
    } catch (error) {
        next(error);
    }
});

exports.changeUserScore = asyncHandler(async (req, res, next) => {
    try {
        const changeUserScoreResponse = await changeUserScoreSQL(req.params.uid, req.params.type, req.body.score);
        
        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully changed user score.'
        });
    } catch (error) {
        next(error)
    }
})