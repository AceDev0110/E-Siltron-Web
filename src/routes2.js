import Dashboard from "views/Dashboard.js";
import Products from 'views/Products';
import Enquiry from 'views/Enquiry';
import ContactUs from 'views/ContactUs';

var routes = [
  {
    path: "/dashboard",
    name: "SILTRON ELECTRONICS",
    icon: "nc-icon nc-layout-11",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-album-2",
    component: Products,
    layout: "/",
  },
  {
    path: "/enquire",
    name: "Enquiry",
    icon: "nc-icon nc-book-bookmark",
    component: Enquiry,
    layout: "/",
  },
  {
    path: "/contactus",
    name: "Contact Us",
    icon: "nc-icon nc-email-85",
    component: ContactUs,
    layout: "/",
  },
];
export default routes;
