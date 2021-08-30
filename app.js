const express = require('express');
const mongoose = require('mongoose');

const { errorMessage, statusCodes, variables: { PORT, MONG_CONNECT } } = require('./configs');
const {
    authRouter,
    coctailRouter,
    userRouter
} = require('./routers');

const app = express();

mongoose.connect(MONG_CONNECT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/coctails', coctailRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.NOT_FOUND,
        message: err.message || errorMessage.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res.status(err.status || statusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
}
