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

delete process.env.BROWSER;
const app = express();
const hbs = exphbs.create({});

// Ready
// ....setup the app
app.use(compress());
app.set('views', './src/server/views');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static('src/server/resources'));

// Steady
// ...setup the Routes
app.use('/status',function (req, res) {
  res.sendStatus(200);
  res.end();
});
app.use('/', authRouter);
app.use('/api/v0', ensureApiAuthenticated, apiRouter);
app.use('/', ensureAuthenticated, dataPreloader);
app.use('/', ensureAuthenticated, renderRoute);

// error handler for routes not on the api
app.use(function(err, req, res, next) {
  Router.run(errorRoutes, req.url, (Handler, state) => {
    let content = React.renderToString(<Handler />);
    res.render('index', { content: content, jsUrl: config.jsUrl, title: DocumentTitle.rewind() });
  });
});

function renderRoute(req, res) {

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  let iso = new Iso();

  Router.run(routes, req.url, (Handler, state) => {
    let notfound = state.routes.filter(route => route.name === '404').length > 0;
    if ( notfound ) {
      res.status(404);
    }
    let content = React.renderToString(<Handler />);
    iso.add(content, alt.flush());
    res.render('index', { content: iso.render(), jsUrl: config.jsUrl, title: DocumentTitle.rewind() });

  });
}

//Go!!!
var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Lantern app listening at http://%s:%s', host, port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.gotoUrl = req.originalUrl;
  res.redirect('/login');
}

function ensureApiAuthenticated(req, res, next) {
  if (req.isAuthenticated() || req.query.apiKey == process.env.LANTERN_API_KEY) { return next(); }
  res.sendStatus(401);
}
