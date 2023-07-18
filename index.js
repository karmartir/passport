const express = require('express')
const passport = require('passport')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const {urlencoded} = require("express");
const app = express()
const port = 3000

app.use(express.json())
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

require('./passportConfig.js')

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.get('/login', (req, res) => {
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
    })
    (req, res, next);
})

app.get('/admin', (req, res) => {
    res.send('This is a admin page')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})