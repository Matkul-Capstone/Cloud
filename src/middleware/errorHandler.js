function errorHandler(err, req, res, next){
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    console.log(statusCode, message, err);

    res.status(statusCode).json({
        'success': false,
        'status': statusCode,
        'message': message,
    });
}

module.exports = errorHandler;