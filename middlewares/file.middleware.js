const { constants: { PHOTO_MAX_SIZE, MIMETYPES }, errorMessage, statusCodes } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar;

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.FILE_TOO_BIG);
            }

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, errorMessage.WRONG_FILE_TYPE);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
