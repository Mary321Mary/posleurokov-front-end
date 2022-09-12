import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/lesson/:id" />
    <Route path="/catalogue/:cityParam/:categoryParam" />
    <Route path="/catalogue/:cityParam" />
    <Route path="/:cityParam" />
    <Route path="/" />
  </Route>
);
