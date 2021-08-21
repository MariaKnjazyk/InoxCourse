const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const {PORT} = require('./configs/variables');

const app = express();

const pathStatic = path.join(__dirname, 'static');
const pathUsers = path.join(__dirname, 'dataBase', 'users.txt')

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

    users = JSON.parse('[' + data.toString() + ']');
})

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/auth', (req, res) => {
    const {mail, password} = req.body;

    const logUser = users.find(user => user.mail === mail && user.password === password);

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

    if (!mail || !password) {
        res.status(400).redirect('/error?info=not_all_fields_are_filled');
        return;
    }

    const isReg = users.some(user => user.mail === mail);

    if (isReg) {
        res.status(400).redirect('/error?info=User_with_such_an_email_already_exists');
        return;
    }

    users.push(req.body);

    fs.appendFile(pathUsers, ',\n' + JSON.stringify(req.body), err => {
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

