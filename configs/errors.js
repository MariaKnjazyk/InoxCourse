module.exports = {
    BAD_REQUEST: {
        FILE_TOO_BIG: {
            message: 'file is too big',
            customCode: 4001,
            status: 400
        },

        NOT_VALID_DATA: {
            message: 'not valid data',
            customCode: 4002,
            status: 400
        },

        WRONG_ROLE: {
            message: 'wrong role',
            customCode: 4003,
            status: 400
        },

        WRONG_FILE_TYPE: {
            message: 'wrong type of file',
            customCode: 4004,
            status: 400
        },
    },

    CONFLICT: {
        EXIST_EMAIL: {
            message: 'email is already exist',
            customCode: 4091,
            status: 409
        },

        EXIST_NAME: {
            message: 'name is already exist',
            customCode: 4092,
            status: 409
        },
    },

    FORBIDDEN: {
        FORBIDDEN: {
            message: 'forbidden',
            customCode: 4031,
            status: 403
        },

        CORS_NOT_ALLOWED: {
            message: 'CORS not allowed',
            customCode: 4032,
            status: 403
        }
    },

    INTERNAL_SERVER_ERROR: {
        WRONG_TEMPLATE_NAME: {
            message: 'wrong template name',
            customCode: 5001,
            status: 500
        },

        WRONG_TOKEN_TYPE: {
            message: 'wrong token type',
            customCode: 5002,
            status: 500
        },
    },

    NOT_FOUND: {
        ACCOUNT_IS_NOT_ACTIVATED: {
            message: 'account is not activated',
            customCode: 4041,
            status: 404
        },

        NOT_FOUND: {
            message: 'not found',
            customCode: 4042,
            status: 404
        },

        WRONG_PASSW_OR_EMAIL: {
            message: 'wrong email or password',
            customCode: 4043,
            status: 404
        },
    },

    NOT_VALID_TOKEN: {
        NO_TOKEN: {
            message: 'no token',
            customCode: 4011,
            status: 401
        },

        NOT_VALID_TOKEN: {
            message: 'not valid token',
            customCode: 4012,
            status: 401
        },
    },
};
