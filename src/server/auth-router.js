import express from "express";
import PassportWrapper from "./passport-config"
import session from "express-session";
import dotEnv from "dotenv";
dotEnv.load();

let router = express.Router();

let SESSION_COOKIE_SECRET = process.env.SESSION_COOKIE_SECRET;
router.use(session({ secret: SESSION_COOKIE_SECRET, resave: false, saveUninitialized: false }));

let passport = new PassportWrapper().create();
router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function(req, res){
    res.redirect('/auth/google');
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }),
    function(req, res){
        // The request will be redirected to Google for authentication, so this function will not be called.
    });

let HOST_DOMAIN = process.env.HOST_DOMAIN;
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        if (req.user && !endsWith(req.user.email, HOST_DOMAIN)) {
            res.sendStatus(403);
        }
        let gotoUrl = req.session.gotoUrl || '/';
        req.session.gotoUrl = null;
        res.redirect(gotoUrl);
    });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function endsWith(text, pattern) {
    var lastIndex = text.lastIndexOf(pattern);
    return (lastIndex !== -1) && (lastIndex + pattern.length === text.length);
}

export default router;