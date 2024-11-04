const auth = require('../config/firebaseConfig');
const { signInWithEmailAndPassword } = require('firebase/auth');

async function loginUserFirebase(email, password){
    try {
        const firebaseLoginResponse = await signInWithEmailAndPassword(auth, email, password);
        return firebaseLoginResponse.user.uid;
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-password' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
            error.message = 'Incorrect email or password. Make sure your account is already registered.';
            error.statusCode = 400;
        }
        throw error;
    }
};

module.exports = loginUserFirebase;