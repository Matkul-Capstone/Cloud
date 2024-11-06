function checkRequiredFields(...fields) {
    return (req, res, next) => {
        const missingFields = fields.filter(field => req.body[field] == null);

        if (missingFields.length > 0) {
            const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
            error.statusCode = 400;
            return next(error);
        }

        next();
    };
}

module.exports = checkRequiredFields;