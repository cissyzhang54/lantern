import { Route, DefaultRoute, NotFoundRoute } from "react-router";
import React from "react";
import AppController from "../controllers/AppController";
import Error404 from "../handlers/404";

export default (
  <Route handler={ AppController } path="*" >
    <DefaultRoute handler={Error404} />
  </Route>
);
