const auth = require('../config/firebaseConfig');
const { sendPasswordResetEmail } = require('firebase/auth');

async function resetPassword(email){
    try {
        await sendPasswordResetEmail(auth, email);
        return 'untuk reset password silahkan cek email';
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
};

module.exports = resetPassword;