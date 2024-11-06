const db = require('../config/sqlConfig');

async function registerUserSQL(uid, email, username){
    try {
        const sqlQuery = 'INSERT INTO user (user_id, username, user_email) VALUES(?, ?, ?)';
        await db.query(sqlQuery, [uid, username, email]);
        return 'success';
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to register user in SQL.';
        throw error;
    }
};

module.exports = registerUserSQL;