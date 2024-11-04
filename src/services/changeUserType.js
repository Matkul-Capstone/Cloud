const db = require('../config/sqlConfig');

async function changeUserTypeSQL(uid, userType){
    try {
        const sqlQuery = 'UPDATE user SET user_type = ? WHERE user_id = ?'
        const result = await db.query(sqlQuery, [userType, uid]);

        if (result[0].affectedRows === 0){
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        return {
            'userType': userType
        };
    } catch (error) {
        if (!error.statusCode && !error.message) {
            error.statusCode = 400;
            error.message = 'Failed to change user type.';
        }
        throw error;
    }
};

module.exports = changeUserTypeSQL;