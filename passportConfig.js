const passport = require('passport')

const LocalStrategy = require('passport-local')
const user = {
    id: 1,
    email: 'test@gmail.com',
    password: '1234'
}

passport.serializeUser(function (user, done) { //сохраняет юзера
        console.log('Serialization', user)
        done(null, user.id);
    }
);


passport.deserializeUser(function (id, done) { //проверяет id
        console.log('deserializeUser', id)
        const userOne = (user.id === id) ? user : false //сравниваем id из базы данных на строке 4 с id который вернул сериализатор
        done(null, userOne);
    }
);

passport.use(
    new LocalStrategy({usernameField: 'email'},
        function verify(email, password, done) {
            if (email === user.email && password === user.password) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
);