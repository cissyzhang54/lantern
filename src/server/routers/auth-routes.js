import express from "express";
import session, {MemoryStore} from "express-session";
import {createClient as createRedisClient} from "redis";
import RedisStore from "connect-redis";
import PassportWrapper from "../passport-config";
import Logger from '../logger';

let log = new Logger();
let router = express.Router();
let sessionStore;

if (process.env.USE_MEMORY_STORE === "true") {
    sessionStore = new MemoryStore();
} else {
    let redisUrl = process.env.OPENREDIS_URL || "redis://:test@localhost:6379";
    let redisClient = createRedisClient(redisUrl);
    let redisStore = RedisStore(session);
    sessionStore = new redisStore({ client: redisClient });
}

router.use(session({
  secret: process.env.SESSION_COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

let passport = new PassportWrapper().create();
router.use(passport.initialize());
router.use(passport.session());

router.get('/login', (req, res) =>{
    res.redirect('/auth/google');
});

router.get('/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ]}),
    // The request will be redirected to Google for authentication, so this function will not be called.
    () => {});

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res, next) => {
    log.info('User Login: ' + req.user.email);
    res.redirect(req.session.gotoUrl || '/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


router.use((err, req, res, next) => {
  //console.log(err, "I CAUGHT IT");
  next();
})


export default router;
