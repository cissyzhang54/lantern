import express from "express";
import exphbs from "express-handlebars";
import React from "react";
import Router from "react-router";
import DocumentTitle from 'react-document-title';
import alt from "../shared/alt";
import Iso from "iso";
import config from "../shared/config";
import dataPreloader from "./dataPreloader";
import routes from "../shared/routes";
import apiRouter from "./api-routes";
import authRouter from "./auth-router";

delete process.env.BROWSER;
const app = express();
const hbs = exphbs.create({});

// Ready
// ....setup the app
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
app.use('/', ensureAuthenticated, function (req, res) {

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  let iso = new Iso();

  Router.run(routes, req.url, (Handler, state) => {

    let notfound = state.routes.filter(route => route.name === '404').length > 0;
    let content = React.renderToString(<Handler />);
    iso.add(content, alt.flush());

    if ( notfound ) {
      res.status(404);
    }
    res.render('index', { content: iso.render(), jsUrl: config.jsUrl, title: DocumentTitle.rewind() });

  });
});


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
