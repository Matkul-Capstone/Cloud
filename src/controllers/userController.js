const asyncHandler = require('express-async-handler');
const registerUserFirebase = require('../services/registerFirebase');
const loginUserFirebase = require('../services/loginFirebase');
const resetPasswordUser = require('../services/resetPassword');

exports.registerUser = asyncHandler(async (req, res) => {
    try {
        const registerFirebase = await registerUserFirebase(req.body.email, req.body.password);

        if(registerFirebase.status === 'fail'){
            res.status(400).json(registerFirebase);
            return;
        }

        res.status(201).json({
            'status': 'success',
            'message': 'register berhasil',
            'data': {
                'uid': registerFirebase
            }
        });

        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': 'harap maklum',
        });
        return;
    }
})

exports.loginUser = asyncHandler(async (req, res) => {
    try {
        const loginFirebase = await loginUserFirebase(req.body.email, req.body.password);

        if(loginFirebase.status === 'fail'){
            res.status(400).json(loginFirebase);
            return;
        }

        res.status(200).json({
            'status': 'success',
            'message': 'login berhasil',
            'data': {
                'uid': loginFirebase
            }
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': 'harap maklum',
        });
        return;
    }
})

exports.resetPassword = asyncHandler(async (req, res) => {
    try {
        const resetPasswordResponse = await resetPasswordUser(req.body.email);

        if(resetPasswordResponse.status === 'fail'){
            res.status(400).json(resetPasswordResponse);
            return;
        }

        res.status(200).json({
            'status': 'success',
            'message': 'silahkan cek email anda'
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'status': 'fail',
            'message': 'harap maklum',
        });
        return;
    }
})