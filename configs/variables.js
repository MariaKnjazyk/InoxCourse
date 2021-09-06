module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'SecretWord',
    ACTION_SECRET_KEY: process.env.ACTION_SECRET_KEY || 'Word',
    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || '12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://inoxoft.com',
    FRONTEND_URL_PASSWORD: process.env.FRONTEND_URL_PASSWORD || 'https://mcd.com.ua',
    MONG_CONNECT: process.env.MONG_CONNECT || 'mongodb://localhost:27017/inoxCourse',
    PORT: process.env.PORT || 5000,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SuperSecretWord',
};
