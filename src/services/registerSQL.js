const db = require('../config/sqlConfig');

async function registerUserSQL(uid, email, username){
    try {
        const sqlQuery = 'INSERT INTO user (user_id, username, user_email) VALUES(?, ?, ?)';
        await db.query(sqlQuery, [uid, username, email]);
        return 'success';
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
}

module.exports = registerUserSQL;