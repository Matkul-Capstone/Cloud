const db = require('../config/sqlConfig');

async function changeUserScoreSQL(uid, type, score){
    try {
        let sqlQuery = 'UPDATE user SET beginner_score = ? WHERE user_id = ?';

        if (type === "Intermediate") {
            sqlQuery = 'UPDATE user SET intermediate_score = ? WHERE user_id = ?'
        } else if (type === "Advanced") {
            sqlQuery = 'UPDATE user SET advance_score = ? WHERE user_id = ?'
        }

        const result = await db.query(sqlQuery, [score, uid]);

        if (result[0].affectedRows === 0){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

    } catch (error) {
        if (!error.statusCode && !error.message) {
            error.statusCode = 400;
            error.message = 'Failed to change user score.';
        }
        throw error;
    }
}

module.exports = changeUserScoreSQL;