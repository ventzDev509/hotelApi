const passport = require('passport')
const passportJWT = require('passport-jwt')
const {user} = require('../db/sequelize')

passport.use(
    new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'SECRET_KEY'
    } ,
        function (jwtPayload, done) {
            return user.findOne(jwtPayload.email)
                .then((user) => {
                    return done(null, user)
                })
                .catch(error => { return done(error) })
        }
    )
)