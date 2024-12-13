const db = require('../config/sqlConfig');

async function getSentencesByTypeSQL(sentence_type){
    try {
        const sqlQuery = 'SELECT * FROM sentences WHERE sentence_type = ?';
        const [results] = await db.query(sqlQuery, [sentence_type]);

        if(results.length === 0){
            const error = new Error('Sentence type not found.');
            error.statusCode = 404;
            throw error;
        }

        return results;
    } catch (error) {
        if (!error.statusCode && !error.message) {
            error.statusCode = 400;
            error.message = 'Failed to get sentences by type'
        }
        throw error;
    }
}

module.exports = getSentencesByTypeSQL;