const dotenv = require('dotenv');
const passport = require('passport');

const jwtStrategy = require("passport-jwt").Strategy;
ExtractJwt = require("passport-jwt").ExtractJwt;

const userModel = require("../Models/user.model");

dotenv.config()
const jwtSecretKey = process.env.SECRETE_KEY

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

const strategy = new jwtStrategy(opts, async (jwt_payload, done) => {

    console.log("jwtPayload", jwt_payload);
    const userId = jwt_payload.userId;

    const user = await userModel.findById(userId);
    if (!user) {
        return done("Invalid user")
    }

    if (user) {
        return done(null, user)
    } else {
        return done(null, false)
    }

})

passport.use(strategy);

module.exports = passport;