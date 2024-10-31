const db = require('../config/sqlConfig');

async function getSentencesByTypeSQL(sentence_type){
    try {
        const sqlQuery = 'SELECT * FROM sentences WHERE sentence_type = ?';
        const [results] = db.query(sqlQuery, [sentence_type]);
        return results;
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
}

module.exports = getSentencesByTypeSQL;