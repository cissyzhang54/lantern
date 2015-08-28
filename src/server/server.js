import express from "express";
import exphbs from "express-handlebars";
import React from "react";
import Router from "react-router";
import alt from "../shared/alt";
import Iso from "iso";
import config from "../shared/config";
import dataPreloader from "./dataPreloader";

const app = express();
const hbs = exphbs.create({});

app.set('views', './src/server/views');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static('src/server/resources'));

delete process.env.BROWSER;

// Ready
// ...setup the Routers
import routes from "../shared/routes";
import apiRouter from "./api-routes";
app.use('/api/v0', apiRouter);


//Steady
// ....preload data for isomorphism
app.use('/', dataPreloader);

app.use(function (req, res) {

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  let iso = new Iso();

  Router.run(routes, req.url, Handler => {
    let content = React.renderToString(<Handler />);
    iso.add(content, alt.flush());
    res.render('index', { content: iso.render(), jsUrl: config.jsUrl });
  });

});


//Go!!!
var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
