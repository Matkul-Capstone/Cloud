const db = require('../config/sqlConfig');

async function getUserSQL(uid){
    try {
        const sqlQuery = 'SELECT * FROM user WHERE user_id = ?'
        const [results] = await db.query(sqlQuery, [uid]);

        if(results[0] === undefined){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        return results[0];
    } catch (error) {
        if (!error.statusCode && !error.message) {
            error.statusCode = 400;
            error.message = 'Failed to get user';
        }
        throw error;
    }
};

module.exports = getUserSQL;