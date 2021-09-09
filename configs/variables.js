module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'SecretWord',
    ACTIVATE_ACCOUNT_SECRET_KEY: process.env.ACTIVATE_ACCOUNT_SECRET_KEY || 'WordSecret',
    FORGOT_PASSWORD_SECRET_KEY: process.env.FORGOT_PASSWORD_SECRET_KEY || 'Word',
    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || '12345',
    EMAIL_SUPER_ADMIN: process.env.EMAIL_SUPER_ADMIN || 'super_admin@gmail.com',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://inoxoft.com',
    FRONTEND_URL_PASSWORD: process.env.FRONTEND_URL_PASSWORD || 'https://mcd.com.ua',
    MONG_CONNECT: process.env.MONG_CONNECT || 'mongodb://localhost:27017/inoxCourse',
    NAME_SUPER_ADMIN: process.env.NAME_SUPER_ADMIN || 'superAdmin',
    PORT: process.env.PORT || 5000,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SuperSecretWord',
    TEMP_PASS: process.env.TEMP_PATH || 'Pa$'
};
