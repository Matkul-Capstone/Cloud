const db = require('../config/sqlConfig');

async function getSentenceSQL(sid){
    try {
        const sqlQuery = 'SELECT * FROM sentences WHERE sentence_id = ?';
        const [results] = await db.query(sqlQuery, [sid]);

        if(!results[0]){
            const error = new Error('Sentence not found.');
            error.statusCode = 404;
            throw error;
        }

        return results[0];
    } catch (error) {
        if(!error.statusCode && !error.statusCode){
            error.statusCode = 400;
            error.message = 'Failed to get sentence'
        }
        throw error
    }
}

module.exports = getSentenceSQL;