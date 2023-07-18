const express = require('express')
const session = require('express-session')

const FileStore = require('session-file-store')(session)
const passport = require('passport')

const app = express()
const port = 3000

app.use(express.json()) //парсинг
app.use(express.urlencoded({extended: false}))

app.use(
    session({
        secret: '12345',
        store: new FileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        },
        resave: false,
        saveUninitialized: false
    })
)

require('./passportConfig.js') //подключение конфига

app.use(passport.initialize()) // подключаемся к сессии
app.use(passport.session()) // сохраняем пользователя

const {urlencoded} = require("express");



app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

//сюда отправляем email & password для аутентификации
app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send('Enter correct email and password')
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin');
        })
    }) (req, res, next);
})

//authentication
const auth = (req, res, next) => {
    return res.redirect('/');
}

app.get('/admin', auth, (req, res) => {
    res.send('This is an admin page')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})