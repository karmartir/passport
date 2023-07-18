const passport = require('passport')

const LocalStrategy = require('passport-local')
const user = {
    id: 1,
    email: 'test@gmail.com',
    password: '1234'
}

passport.serializeUser(function (user, done) {
        console.log('Serialization', user)
        done(null, user.id);
    }
);


passport.deserializeUser(function (id, done) {
        console.log('deserializeUser', id)
        const user = (user.id === id) ? user : false
        done(null, user);
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
)