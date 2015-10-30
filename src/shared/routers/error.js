import { Route } from "react-router";
import React from "react";

import AppController from "../controllers/AppController";
import Error404 from "../handlers/404";


export default (
  <Route component={ AppController } >
    <Route path="*" component={Error404} />
  </Route>
);
