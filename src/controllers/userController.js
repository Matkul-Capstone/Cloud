const asyncHandler = require('express-async-handler');
const getUserSQL = require('../services/getUser');
const registerUserFirebase = require('../services/registerFirebase');
const registerUserSQL = require('../services/registerSQL');
const loginUserFirebase = require('../services/loginFirebase');
const resetPasswordUser = require('../services/resetPassword');
const changeUsernameSQL = require('../services/changeUsername');
const changeUserTypeSQL = require('../services/changeUserType');

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

        res.status(200).json({
            'success': true,
            'status': 200,
            'message': 'Successfully login.',
            'data': userData
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
        const changeUsernameResponse = changeUsernameSQL(req.params.uid, req.body.newUsername);

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