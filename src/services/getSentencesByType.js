const db = require('../config/sqlConfig');

async function getSentencesByTypeSQL(sentence_type){
    try {
        const sqlQuery = 'SELECT * FROM sentences WHERE sentence_type = ?';
        const [results] = await db.query(sqlQuery, [sentence_type]);
        return results;
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to get sentences by type'
        throw error;
    }
}

module.exports = getSentencesByTypeSQL;