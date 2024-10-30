const auth = require('../config/firebaseConfig');
const { signInWithEmailAndPassword } = require('firebase/auth');

async function loginUserFirebase(email, password){
    try {
        const firebaseLoginResponse = await signInWithEmailAndPassword(auth, email, password);
        return firebaseLoginResponse.user.uid;
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
};

module.exports = loginUserFirebase;