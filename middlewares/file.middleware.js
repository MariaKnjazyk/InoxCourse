const { constants: { PHOTO_MAX_SIZE, MIMETYPES } } = require('../configs');
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
                throw new ErrorHandler(400, `File ${name} is too big`);
            }

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(400, 'Wrong file format');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
