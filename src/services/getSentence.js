const db = require('../config/sqlConfig');

async function getSentenceSQL(sid){
    try {
        const sqlQuery = 'SELECT * FROM sentences WHERE sentence_id = ?';
        const [results] = db.query(sqlQuery, [sid]);
        return results[0];
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
}

module.exports = getSentenceSQL;