const db = require('../config/sqlConfig');

async function changeUsernameSQL(uid, newUsername){
    try {
        const sqlQuery = 'UPDATE user SET username = ? WHERE user_id = ?'
        await db.query(sqlQuery, [newUsername, uid]);
        return {
            'newUsername': newUsername
        };
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
}

module.exports = changeUsernameSQL;