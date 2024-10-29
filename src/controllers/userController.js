const asyncHandler = require('express-async-handler');
const registerUserFirebase = require('../services/registerFirebase');
const loginUserFirebase = require('../services/loginFirebase');

exports.registerUser = asyncHandler(async (req, res) => {
    try {
        const registerFirebase = await registerUserFirebase(req.body.email, req.body.password);

        if(registerFirebase === 'fail'){
            res.status(400).json({
                'status': 'fail',
                'message': 'cek kembali email dan password anda'
            })
        }

        res.status(201).json({
            'status': 'success',
            'message': 'register berhasil',
            'data': {
                'uid': registerFirebase
            }
        });
    } catch (error) {
        console.log(error);
        res.status(error.status).json({
            'status': 'fail',
            'message': error.message,
        });
    }
})

exports.loginUser = asyncHandler(async (req, res) => {
    try {
        const loginFirebase = await loginUserFirebase(req.body.email, req.body.password);

        if(loginFirebase === 'fail'){
            res.status(400).json({
                'status': 'fail',
                'message': 'cek kembali email dan password anda'
            })
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
        res.status(error.status).json({
            'status': 'fail',
            'message': error.message,
        });
    }
})