import Passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth2";
import dotEnv from "dotenv";
dotEnv.load();

let GOOGLE_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
let GOOGLE_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
let appUrl = process.env.HEROKU_APP_NAME ? ("http://" + process.env.HEROKU_APP_NAME + ".herokuapp.com") : null;
let HOST_URL = appUrl || process.env.HOST_URL;

let PassportWrapper = function() {};

PassportWrapper.prototype.create = function() {
    let passport = new Passport.Passport();
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this app does not
    //   have a database of user records, the complete Google profile is (de)serialized.
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: HOST_URL + "/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                // the user's Google profile is returned to represent the logged-in user.
                return done(null, profile);
            });
        }
    ));
    return passport;
};

export default PassportWrapper;