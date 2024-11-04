const db = require('../config/sqlConfig');

async function getLogsSQL(uid){
    try {
        const sqlQuery = 'SELECT * FROM complition_logs WHERE user_id = ?';
        const [results] = await db.query(sqlQuery, [uid]);
        return results;
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to get logs'
        throw error
    }
}

module.exports = getLogsSQL;