const db = require('../config/sqlConfig');

async function getUserSQL(uid){
 try {
    const sqlQuery = 'SELECT * FROM user WHERE user_id = ?'
    const [results] = await db.query(sqlQuery, [uid]);
    return results[0];
 } catch (error) {
    console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
 }
}

module.exports = getUserSQL;