const db = require('../config/sqlConfig');

async function postLogsSQL(uid, chapter, sid, score, completed, timestamp){
    try {
        const sqlQuery = 'INSERT INTO complition_logs (user_id, chapter, sentence_id, score, completed, timestamp) VALUES (?, ?, ?, ?, ?)';
        await db.query(sqlQuery, [uid, chapter, sid, score, completed, timestamp]);
        return 'Successfully post log.'
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to post log.';
        throw error;
    }
};

module.exports = postLogsSQL;