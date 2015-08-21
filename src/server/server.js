import express from "express";
import exphbs from "express-handlebars";
import React from "react";
import Router from "react-router";
const app = express();
const hbs = exphbs.create({});

// set up Jade
app.set('views', './views');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

import routes from "../shared/routes";

app.get('/api/:category(article|topic|author)/:uuid', function (req, res) {
  Router.run(routes, req.url, Handler => {
    res.json({
      uuid: req.params.uuid,
      category: req.params.category
      });
  });
});

app.get('/*', function (req, res) {
  Router.run(routes, req.url, Handler => {
    let content = React.renderToString(<Handler />);
    res.render('index', { content: content });
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
