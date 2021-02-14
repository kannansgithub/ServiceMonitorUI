import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Dashboard from "./views/Dashboard";
import Database from "./views/Database";
import Errors from "./views/Errors";
import WebApi from "./views/WebAPI";
import Server from "./views/Server";
import Services from "./views/Services";
import Forms from "./views/Forms";
import ServiceLog from './views/ServiceLog';
// import Notfound from './views/Notfound';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  {
    path: "/forms",
    layout: DefaultLayout,
    component: Forms
  },
  {
    path: "/database",
    layout: DefaultLayout,
    component: Database
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/web-api",
    layout: DefaultLayout,
    component: WebApi
  },
  {
    path: "/server",
    layout: DefaultLayout,
    component: Server
  },
  {
    path: "/services",
    layout: DefaultLayout,
    component: Services
  },
  {
    path: "/:serviceId/service-log",
    layout: DefaultLayout,
    component: ServiceLog
  }
  // ,
  //  {
  //    path: "*",
  //    exact: true,
  //   layout: DefaultLayout,
  //    component: Notfound
  // }
];
