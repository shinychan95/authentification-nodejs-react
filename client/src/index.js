import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.jsx";
import MainLayout from "./layouts/Main.jsx"


ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/main" render={props => <MainLayout {...props} />} />
        <Redirect from="/" to="/auth/login"/>
      </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);


// Progressive Web Apps이 되기 위해서 필수 조건인 Service Worker
//serviceWorker.unregister();
