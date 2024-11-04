const db = require('../config/sqlConfig');

async function getCompletedSentencesSQL(uid, sentence_type){
    try {
        const sqlQuery = 'SELECT sentences.sentence, COALESCE(complition_logs.completed, 0) AS completed FROM complition_logs RIGHT JOIN sentences ON sentences.sentence_id = complition_logs.sentence_id WHERE complition_logs.user_id = ? AND words.word_type = ?';
        const [results] = await db.query(sqlQuery, [uid, sentence_type]);
        return results;
    } catch (error) {
        error.statusCode = 400;
        error.message = 'Failed to get completed sentences'
        throw error
    }
}

module.exports = getCompletedSentencesSQL;