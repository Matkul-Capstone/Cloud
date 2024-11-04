const db = require('../config/sqlConfig');

async function changeUsernameSQL(uid, newUsername){
    try {
        const sqlQuery = 'UPDATE user SET username = ? WHERE user_id = ?'
        const result = await db.query(sqlQuery, [newUsername, uid]);

        if (result[0].affectedRows === 0){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        return {
            'newUsername': newUsername
        };
    } catch (error) {
        if (!error.statusCode && !error.message) {
            error.statusCode = 400;
            error.message = 'Failed to change username'
        }
        throw error;
    }
};

module.exports = changeUsernameSQL;