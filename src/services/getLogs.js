const db = require('../config/sqlConfig');

async function getLogsSQL(uid){
    try {
        const sqlQuery = 'SELECT * FROM complition_logs WHERE user_id = ?';
        const [results] = db.query(sqlQuery, [uid]);
        return results[0];
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
}

module.exports = getLogsSQL;