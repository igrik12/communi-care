/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// core components/views for Admin layout
import Records from 'views/Records';
import Reports from 'views/Reports';
import Management from 'views/Management';
import Clients from 'views/Clients';

const routes = [
  {
    path: '/records',
    name: 'Records',
    icon: Dashboard,
    component: Records,
    layout: '/user',
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: Person,
    component: Reports,
    layout: '/user',
  },

  {
    path: '/clients',
    name: 'Clients',
    icon: Person,
    component: Clients,
    layout: '/user',
  },
  {
    path: '/management',
    name: 'Management',
    icon: 'content_paste',
    component: Management,
    layout: '/user',
  },
];

export default routes;
