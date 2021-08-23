const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const {PORT} = require('./configs/variables');

const app = express();

const pathStatic = path.join(__dirname, 'static');
const pathUsers = path.join(__dirname, 'dataBase', 'users.json')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(pathStatic));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', pathStatic);

let users = [];
fs.readFile(pathUsers, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    users = JSON.parse(data.toString());
})

function filledFields(mail, password) {
    return !!(mail && password);
}

function normalizationData(mail, password) {
    return {normMail: mail.toLowerCase().trim(), normPass: password.trim()};
}

function validateMail(mail) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(mail);
}

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/auth', (req, res) => {
    const {mail, password} = req.body;

    const isFilledFields = filledFields(mail, password);

    if (!isFilledFields) {
        res.status(400).redirect('/error?info=not_all_fields_are_filled');
        return;
    }

    const {normMail, normPass} = normalizationData(mail, password);

    const isValidMail = validateMail(normMail);

    if (!isValidMail) {
        res.status(400).redirect('/error?info=not_a_valid_mail');
        return;
    }

    const logUser = users.find(user => user.mail === normMail && user.password === normPass);

    if (logUser) {
        res.redirect(`/users?mail=${logUser.mail}`);
        return;
    }

    res.status(404).redirect('/register?info=user_not_found');
});

app.get('/register', (req, res) => {
    const {info} = req.query;

    res.render('register', {info});
});

app.post('/users', (req, res) => {
    const {mail, password} = req.body;

    const isFilledFields = filledFields(mail, password);

    if (!isFilledFields) {
        res.status(400).redirect('/error?info=not_all_fields_are_filled');
        return;
    }

    const {normMail, normPass} = normalizationData(mail, password);
    const newUser = {mail: normMail, password: normPass};

    const isValidMail = validateMail(newUser.mail);

    if (!isValidMail) {
        res.status(400).redirect('/error?info=not_a_valid_mail');
        return;
    }

    const isReg = users.some(user => user.mail === newUser.mail);

    if (isReg) {
        res.status(400).redirect('/error?info=User_with_such_an_email_already_exists');
        return;
    }

    users.push(newUser);
    fs.writeFile(pathUsers, JSON.stringify(users), err => {
        if (err) {
            console.log(err);
        }
    })

    res.status(201).redirect('/login');
});


app.get('/users', (req, res) => {
    const {mail} = req.query;

    res.render('users', {users, mail});
});

app.get('/users/:userIndex', (req, res) => {
    const {userIndex} = req.params;
    const currentUser = users[userIndex];

    if (!currentUser) {
        res.status(404).end('user not found');
        return;
    }

    res.render('user', {currentUser});
});

app.get('/error', (req, res) => {
    const {info} = req.query;

    res.render('error', {info});
});

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

