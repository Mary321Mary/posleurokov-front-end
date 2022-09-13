import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/lesson/:id" />
    <Route path="/catalogue/all/:categoryParam" />
    <Route path="/catalogue/Online/:categoryParam" />
    <Route path="/catalogue/Гомель/:categoryParam" />
    <Route path="/catalogue/:cityParam" />
    <Route path="/:cityParam" />
    <Route path="/terms" />
    <Route path="/faq" />
    <Route path="/about" />
    <Route path="/contacts" />
    <Route path="/signup" />
    <Route path="/login" />
  </Route>
);
