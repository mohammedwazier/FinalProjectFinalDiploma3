import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Route, Router, Switch } from "react-router-dom";
// import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import Login from "./Routes/Index/Login";
import Register from "./Routes/Index/Register";
import Dashboard from "./Routes/Dashboard/Dashboard";
import NoMatch from "./Views/NoMatch/NoMatch";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path={"/"} exact component={props => <Login {...props} />} />
      <Route
        path={"/login"}
        exact
        component={props => <Login {...props} status="login" />}
      />
      <Route
        path={"/register"}
        exact
        component={props => <Register {...props} status="register" />}
      />

      <Route path={"/dashboard"} component={Dashboard} />

      <Route path={"/404"} exact component={() => <NoMatch />} />
      <Redirect from="*" to="/404" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
