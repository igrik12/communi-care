import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  withAuthenticator,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  RequireNewPassword,
  ConfirmSignUp,
  Loading
} from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import Navbar from 'components/Navbars/Navbar.js';
import Footer from 'components/Footer/Footer.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import ToastAlert from 'components/ToastAlert';

import routes from 'routes.js';

import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      }
      return null;
    })}
    <Redirect from='/admin' to='/admin/records' />
  </Switch>
);

const useStyles = makeStyles(styles);

function Admin({ ...rest }) {
  const getUser = useStoreActions(actions => actions.getUser);
  const fetchAll = useStoreActions(actions => actions.fetchAll);

  useEffect(() => {
    fetchAll();
  }, [ fetchAll]);

  useEffect(() => {
    const user = Auth.user;
    const { username } = Auth.user;
    const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
    let userType = groups ? groups[0] : 'user';
    getUser({ username, userType });
  }, [getUser]);
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState('orange');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Communi-Care'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar routes={routes} handleDrawerToggle={handleDrawerToggle} {...rest} />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
        <Footer />
      </div>
      <ToastAlert />
    </div>
  );
}

export default withAuthenticator(Admin, false, [
  <SignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <ForgotPassword />,
  <RequireNewPassword />,
  <ConfirmSignUp />,
  <Loading />
]);
