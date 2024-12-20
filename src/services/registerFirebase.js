const auth = require('../config/firebaseConfig');
const { createUserWithEmailAndPassword } = require('firebase/auth');

async function registerUserFirebase(email, password) {
    try {
        const firebaseRegisterResponse = await createUserWithEmailAndPassword(auth, email, password);
        return {
            'uid': firebaseRegisterResponse.user.uid,
            'email': firebaseRegisterResponse.user.email
        };
    } catch (error) {
        if (error.code === 'auth/invalid-password' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
            error.statusCode = 400;
            error.message = 'Incorrect email or password. Make sure your account is already registered.';
        }
        throw error;
    }
};

module.exports = registerUserFirebase;