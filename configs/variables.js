module.exports = {
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'SecretWord',
    MONG_CONNECT: process.env.MONG_CONNECT || 'mongodb://localhost:27017/inoxCourse',
    PORT: process.env.PORT || 5000,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'SuperSecretWord',
};
