module.exports = {
    showInfo: (req, res) => {
        const { info } = req.query;

        res.json(info);
    }
};
