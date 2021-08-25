module.exports = {
    getLoginPage: (req, res) => {
        res.json('login');
    },

    getRegisterPage: (req, res) => {
        res.json('register');
    }
};
