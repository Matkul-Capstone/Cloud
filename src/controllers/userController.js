const asyncHandler = require('express-async-handler');
const getUserSQL = require('../services/getUser');
const registerUserFirebase = require('../services/registerFirebase');
const registerUserSQL = require('../services/registerSQL');
const loginUserFirebase = require('../services/loginFirebase');
const resetPasswordUser = require('../services/resetPassword');
const changeUsernameSQL = require('../services/changeUsername');
const changeUserTypeSQL = require('../services/changeUserType');

exports.getUser = asyncHandler(async (req, res) => {
    try {
        const getUserResponse = await getUserSQL(req.params.uid);

        if(getUserResponse.status === 'fail'){
            res.status(400).json(getUserResponse);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'berhasil get user',
            'data': {
                'user_id': getUserResponse.user_id,
                'username': getUserResponse.username,
                'user_email': getUserResponse.user_email,
                'user_type': getUserResponse.user_type
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

exports.registerUser = asyncHandler(async (req, res) => {
    try {
        const registerFirebaseResponse = await registerUserFirebase(req.body.email, req.body.password);

        if(registerFirebaseResponse.status === 'fail'){
            res.status(400).json(registerFirebaseResponse);
        }

        const registerSQLResponse = await registerUserSQL(registerFirebaseResponse.uid, registerFirebaseResponse.email, req.body.username);

        if(registerSQLResponse.status === 'fail'){
            res.status(400).json(registerSQLResponse);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'register berhasil',
            'data': {
                'uid': registerFirebaseResponse.uid
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

exports.loginUser = asyncHandler(async (req, res) => {
    try {
        const loginFirebase = await loginUserFirebase(req.body.email, req.body.password);

        if(loginFirebase.status === 'fail'){
            res.status(400).json(loginFirebase);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'login berhasil',
            'data': {
                'uid': loginFirebase
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

exports.resetPassword = asyncHandler(async (req, res) => {
    try {
        const resetPasswordResponse = await resetPasswordUser(req.body.email);

        if(resetPasswordResponse.status === 'fail'){
            res.status(400).json(resetPasswordResponse);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'silahkan cek email anda'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': error.message,
        });
    }
})

exports.changeUsername = asyncHandler(async (req, res) => {
    try {
        const changeUsernameResponse = changeUsernameSQL(req.params.uid, req.body.newUsername);

        if (changeUsernameResponse.status === 'fail'){
            res.status(400).json(changeUsernameResponse);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'berhasil merubah username',
            'data': {
                'uid': req.params.uid,
                'newUsername': changeUsernameResponse.newUsername
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

exports.changeUserType = asyncHandler(async (req, res) => {
    try {
        const changeUserTypeResponse = await changeUserType(req.params.uid, req.body.userType);

        if (changeUserTypeResponse.status === 'fail'){
            res.status(400).json(changeUserTypeResponse);
        }

        res.status(200).json({
            'status': 'success',
            'message': 'berhasil merubah username',
            'data': {
                'uid': req.params.uid,
                'newUsername': changeUserTypeResponse.userType
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