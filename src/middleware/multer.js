const Multer = require('multer');
const storage = Multer.memoryStorage();

const upload = Multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'audio/wav'){
            const error = new Error('Invalid mime type.');
            error.statusCode = 400; 
            cb(error);
        }
        cb(null, true);
    }
});

const multerMiddleware = (req, res, next) => {
    upload.single('audio')(req, res, (err) => {
        if(err){
            return next(err);
        }
        else if(!req.file){
            const error = new Error('Missing required file.');
            error.statusCode = 400; 
            return next(error);
        }
        return next();
    })
}

module.exports = multerMiddleware;