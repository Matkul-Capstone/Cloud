const db = require('../config/sqlConfig');

async function getCompletedSentencesSQL(uid, sentence_type){
    try {
        const sqlQuery = 'SELECT sentences.sentence, COALESCE(complition_logs.completed, 0) AS completed FROM complition_logs RIGHT JOIN sentences ON sentences.sentence_id = complition_logs.sentence_id WHERE complition_logs.user_id = ? AND sentences.sentence_type = ?';
        const [results] = await db.query(sqlQuery, [uid, sentence_type]);

        if(!results[0]){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        return results;
    } catch (error) {
        if(!error.statusCode && !error.statusCode){
            error.statusCode = 400;
            error.message = 'Failed to get completed sentences'
        }
        throw error
    }
}

module.exports = getCompletedSentencesSQL;