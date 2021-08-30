module.exports = {
    userNormalizator: (user) => {
        const filedToRemove = 'password';

        const userNorm = user.toObject();

        delete userNorm[filedToRemove];

        return userNorm;
    }
};
