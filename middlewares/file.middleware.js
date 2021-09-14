const {
    constants: { PHOTO_MAX_SIZE, MIMETYPES },
    errors
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(
                    errors.BAD_REQUEST.FILE_TOO_BIG.status,
                    errors.BAD_REQUEST.FILE_TOO_BIG.customCode,
                    errors.BAD_REQUEST.FILE_TOO_BIG.message,
                    name
                );
            }

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(
                    errors.BAD_REQUEST.WRONG_FILE_TYPE.status,
                    errors.BAD_REQUEST.WRONG_FILE_TYPE.customCode,
                    errors.BAD_REQUEST.WRONG_FILE_TYPE.message,
                    name
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
