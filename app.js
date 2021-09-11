const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const {
    errorMessage,
    statusCodes,
    variables: { PORT, MONG_CONNECT }
} = require('./configs');
const {
    adminRouter,
    authRouter,
    coctailRouter,
    userRouter
} = require('./routers');

const { superAdminUtil } = require('./utils');

const app = express();

mongoose.connect(MONG_CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/coctails', coctailRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

(async () => {
    try {
        await superAdminUtil.checkCreateSuperAdmin();
    } catch (e) {
        console.log(e);
    }
})();

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.NOT_FOUND,
        message: err.message || errorMessage.NOT_FOUND
    });
}

//  eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
}
