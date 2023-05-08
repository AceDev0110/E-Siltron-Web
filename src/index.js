import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from "react-router-dom";

import ContactUs from './views/ContactUs';
import Dashboard from './views/Dashboard';
import Enquiry from './views/Enquiry';
import Products from './views/Products';

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import App from './App';
import Routes from './Routes';
import history from './history';

ReactDOM.render(
  <Router>
      <App />
  </Router>,
  document.getElementById('root')
);


