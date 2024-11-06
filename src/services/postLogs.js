const db = require('../config/sqlConfig');

async function postLogsSQL(uid, sid, completed, timestamp){
    try {
        const sqlQuery = 'INSERT INTO complition_logs (user_id, sentence_id, completed, timestamp) VALUES (?, ?, ?, ?)';
        await db.query(sqlQuery, [uid, sid, completed, timestamp]);
        return 'Successfully post log.'
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to post log.';
        throw error;
    }
};

module.exports = postLogsSQL;