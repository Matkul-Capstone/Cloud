const db = require('../config/sqlConfig');

async function getSentencesByTypeSQL(sentence_type){
    try {
        if(sentence_type !== "beginner" && sentence_type !== "intermediate" && sentence_type !== "expert"){
            const error = new Error('Sentence type not found.');
            error.statusCode = 404;
            throw error;
        }
        
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