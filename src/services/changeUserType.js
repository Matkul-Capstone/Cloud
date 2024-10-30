const db = require('../config/sqlConfig');

async function changeUserTypeSQL(uid, userType){
    try {
        const sqlQuery = 'UPDATE user SET user_type = ? WHERE user_id = ?'
        await db.query(sqlQuery, [userType, uid]);
        return {
            'userType': userType
        }
    } catch (error) {
        console.log(error);
        return {
            'status': 'fail',
            'message': error.message
        };
    }
}

module.exports = changeUserTypeSQL;