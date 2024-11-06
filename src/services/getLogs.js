const db = require('../config/sqlConfig');

async function getLogsSQL(uid){
    try {
        const sqlQuery = 'SELECT * FROM complition_logs WHERE user_id = ?';
        const [results] = await db.query(sqlQuery, [uid]);

        if(!results[0]){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        return results;
    } catch (error) {
        if(!error.statusCode && !error.statusCode){
            error.statusCode = 400;
            error.message = 'Failed to get logs'
        }
        throw error
    }
}

module.exports = getLogsSQL;