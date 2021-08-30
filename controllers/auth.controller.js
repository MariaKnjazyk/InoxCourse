module.exports = {
    loginUser: (req, res, next) => {
        try {
            res.redirect('/users');
        } catch (e) {
            next(e);
        }
    }
};
