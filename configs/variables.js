module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'SecretWord',
    ACTIVATE_ACCOUNT_SECRET_KEY: process.env.ACTIVATE_ACCOUNT_SECRET_KEY || 'WordSecret',
    FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY || 'Word',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SuperSecretWord',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    AWS_S3_NAME: process.env.AWS_S3_NAME || '',
    AWS_S3_REGION: process.env.AWS_S3_REGION || '',
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || '',
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY || '',

    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || '12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://inoxoft.com',
    FRONTEND_URL_PASSWORD: process.env.FRONTEND_URL_PASSWORD || 'https://mcd.com.ua',

    EMAIL_SUPER_ADMIN: process.env.EMAIL_SUPER_ADMIN || 'super_admin@gmail.com',
    NAME_SUPER_ADMIN: process.env.NAME_SUPER_ADMIN || 'superAdmin',
    TEMP_PASS: process.env.TEMP_PATH || 'Pa$',

    MONG_CONNECT: process.env.MONG_CONNECT || 'mongodb://localhost:27017/inoxCourse',
    PORT: process.env.PORT || 5000
};
