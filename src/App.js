import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import { createBrowserHistory } from "history";

export default () => (
  <Router
    basename={process.env.REACT_APP_BASENAME || ""}
    history={createBrowserHistory}
  >
    <div>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={withTracker(props => {
              return (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              );
            })}
          />
        );
      })}
    </div>
  </Router>
);
