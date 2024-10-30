const db = require('../config/sqlConfig');

async function postLogsSQL(uid, sid, completed){
    try {
        const sqlQuery = 'INSERT INTO complition_logs (user_id, sentence_id, completed) VALUES (?, ?, ?)';
        await db.query(sqlQuery, [uid, sid, completed]);
        return 'berhasil post log'
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
};

module.exports = postLogsSQL;