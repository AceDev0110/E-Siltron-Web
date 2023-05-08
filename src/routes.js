import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import ContactUs from './views/ContactUs';
import Dashboard from './views/Dashboard';
import Enquiry from './views/Enquiry';
import Products from './views/Products';
import history from './history';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Dashboard}          />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/products" exact component={Products}         />
          <Route path="/enquiry" exact component={Enquiry}           />
          <Route path="/contactus" exact component={ContactUs}       />
          {/* <Redirect from="/" to="dashboard" /> */}
        </Switch>
      </Router>
    )
  }
}
