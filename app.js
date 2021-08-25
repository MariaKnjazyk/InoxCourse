const express = require('express');

const { PORT } = require('./configs/variables');
const {
    authRouter,
    errorRouter,
    login_registerRouter,
    userRouter
} = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/error', errorRouter);
app.use('/users', userRouter);
app.use('/', login_registerRouter);

app.listen(PORT, () => {
    console.log('App listen', PORT);
});
