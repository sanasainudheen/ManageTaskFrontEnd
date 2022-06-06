import {      
  NotFound,
  PasswordReset,
  Signin,
  Signup,  
} from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppProvider from "./components/AppProvider/AppProvider";
import Dashboard from "./containers/Dashboard";
import React from "react";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

render(
  <AppProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/404" component={NotFound} />   
        <Route exact path="/forgot" component={PasswordReset} />
        <Route exact path="/signin" component={Signin} render={(props) => <Signin {...props} />} />
        <Route exact path="/signup" component={Signup} />   
        <Route path="/" component={Dashboard} />   
      </Switch>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById("root")
);

registerServiceWorker();
