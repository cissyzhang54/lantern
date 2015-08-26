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
// setup the prod bundle server
app.use(express.static('public'));


// setup the api Router
import apiRouter from "./api-routes";
app.use('/api/v0', apiRouter);


// setup the React routes (frontend)
import routes from "../shared/routes";
app.get('/*', function (req, res) {
  Router.run(routes, req.url, Handler => {
    let jsUrl = "//localhost:8081";
    if (process.env.NODE_ENV === 'production') {
      jsUrl = "";
    }
    let content = React.renderToString(<Handler />);
    res.render('index', { content: content , jsUrl: jsUrl});
  });
});

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
