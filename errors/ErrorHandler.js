class ErrorHandler extends Error {
    constructor(status, customCode, message = '', data = '') {
        super(message);
        this.status = status;
        this.customCode = customCode;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
