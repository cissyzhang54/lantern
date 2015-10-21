import express from "express";
import exphbs from "express-handlebars";
import React from "react";
import Router from "react-router";
import DocumentTitle from 'react-document-title';
import compress from 'compression';
import Iso from "iso";
import alt from "../shared/alt";
import config from "../shared/config";
import routes from "../shared/routers/routes";
import errorRoutes from "../shared/routers/error";
import dataPreloader from "./routers/dataPreloader-routes";
import apiRouter from "./routers/api-routes";
import authRouter from "./routers/auth-routes";
import statusRouter from "./routers/status-routes";
import uuid from 'uuid';

delete process.env.BROWSER;
let cacheBustId = uuid();
const app = express();
const hbs = exphbs.create({});

let prefetch = ['<https://fonts.googleapis.com/css?family=Work+Sans>; rel=prefetch',
  '<https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css>; rel=prefetch'];

// Ready  ....setup the app
app.use(compress());
app.enable('view cache');
app.set('views', './src/server/views');
app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir:"src/server/views/layouts/"
  }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static('src/server/resources'));

// Steady  ...setup the Routes
app.use('/status', statusRouter);
app.use('/loginFailed', (req, res) =>{
  let title = `Login Failed`
  let message = `Sorry, you must use a valid FT.com email address`
  let link = { message: `Try again?`, url:`${req.query.gotoUrl}`}
  res.render('loggedOut',  { title, message, link});
});
app.use('/bye', (req, res) =>{
  let title = `Logged Out`
  let message = `Thanks for visiting, come again soon!`
  res.render('loggedOut',  { title, message});
});

app.use('/', authRouter);
app.use('/api/v0', ensureApiAuthenticated, apiRouter);
app.use('/', ensureAuthenticated, dataPreloader);
app.use('/', ensureAuthenticated, function appRouter(req, res) {
  renderRoute(routes, req, res)
});
app.use(function ErrorHandler(err, req, res, next) {
  renderRoute(errorRoutes, req, res)
});

//Go!!!
var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Lantern app listening at http://%s:%s', host, port);
});

function renderRoute(route, req, res) {
  let user = req.user
  if ( process.env.NODE_ENV === 'test'){
    user = {
      email: 'test@ft.com',
      name: {
        givenName:'test'
      }
    }
  }
  res.set('Link', prefetch.join(','));
  res.locals.data = res.locals.data || {};
  res.locals.data.UserStore = {
    user: user
  }
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  let iso = new Iso();

  Router.run(route, req.url, (Handler, state) => {
    let notfound = state.routes.filter(route => route.name === '404').length > 0;
    if ( notfound ) {
      res.status(404);
    }
    let content = React.renderToString(<Handler />);
    iso.add(content, alt.flush());
    res.render('index',
      { content: iso.render(),
        jsUrl: config.jsUrl,
        version: '?v=' + cacheBustId,
        title: DocumentTitle.rewind()
      });

  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()
    || process.env.NODE_ENV === 'test') { return next(); }
  req.session.gotoUrl = req.session.gotoUrl || req.originalUrl;
  res.redirect('/login');
}

function ensureApiAuthenticated(req, res, next) {
  if (req.isAuthenticated()
    || req.query.apiKey == process.env.LANTERN_API_KEY
    || process.env.NODE_ENV === 'test') { return next(); }
  res.sendStatus(401);
}
