const db = require('../config/sqlConfig');

async function getSentenceSQL(sid){
    try {
        const sqlQuery = 'SELECT * FROM sentences WHERE sentence_id = ?';
        const [results] = await db.query(sqlQuery, [sid]);
        return results[0];
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to get sentence'
        throw error
    }
}

module.exports = getSentenceSQL;