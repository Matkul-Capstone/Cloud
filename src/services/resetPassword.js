const auth = require('../config/firebaseConfig');
const { sendPasswordResetEmail } = require('firebase/auth');

async function resetPassword(email){
    try {
        await sendPasswordResetEmail(auth, email);
        return 'untuk reset password silahkan cek email';
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to reset password';
        throw error;
    }
};

module.exports = resetPassword;