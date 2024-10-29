const auth = require('../config/firebaseConfig');
const { createUserWithEmailAndPassword } = require('firebase/auth');

async function registerUserFirebase(email, password) {
    try {
        const firebaseRegisterResponse = await createUserWithEmailAndPassword(auth, email, password);

        return firebaseRegisterResponse.user.uid;
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
};

module.exports = registerUserFirebase;