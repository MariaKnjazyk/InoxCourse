const cors = require('cors');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const {
    errorMessage,
    statusCodes,
    variables: { ALLOWED_ORIGIN, PORT, MONG_CONNECT }
} = require('./configs');
const {
    adminRouter,
    authRouter,
    coctailRouter,
    userRouter
} = require('./routers');
const { ErrorHandler } = require('./errors');
const cronJobs = require('./cron');
const { superAdminUtil } = require('./utils');

const app = express();

mongoose.connect(MONG_CONNECT);

app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

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
    cronJobs();
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

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(403, 'CORS not allowed'), false);
    }

    return callback(null, true);
}
