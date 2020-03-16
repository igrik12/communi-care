import React, { useMemo, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Route, Switch, Redirect } from 'react-router';
import {
  withAuthenticator,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  RequireNewPassword,
  ConfirmSignUp
} from 'aws-amplify-react';
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import CssBaseLine from '@material-ui/core/CssBaseline';
import ClientRecord from './components/Pages/ClientRecord';
import CareReports from './components/Pages/CareReports';
import Management from './components/Pages/Management';
import Layout from './components/Layout';
import { isDeveloper } from './utils/permissions';
import { Auth } from 'aws-amplify';

function App() {
  const themeColor = useStoreState(state => state.layoutModel.themeColor);
  const setUserGroups = useStoreActions(actions => actions.setUserGroups);
  const userGroups = useStoreState(state => state.userGroups);
  const getUser = useStoreActions(actions => actions.getUser);
  const fetchAll = useStoreActions(actions => actions.fetchAll);
  let theme = useMemo(() => {
    return createMuiTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            height: '100%'
          },
          responsiveScroll: {
            maxHeight: 'none',
            height: 'calc(100% - 128px)'
          }
        }
      },
      palette: {
        type: themeColor,
        primary: {
          main: blue[600],
          dark: blue[800],
          light: blue[300]
        },
        secondary: {
          light: '#DB2828',
          main: '#DB2828',
          contrastText: '#ffcc00'
        },

        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
          ].join(',')
        }
      }
    });
  }, [themeColor]);

  theme = responsiveFontSizes(theme);

  useEffect(() => {
    const groups = Auth.user.signInUserSession.accessToken.payload['cognito:groups'];
    setUserGroups(groups);
    fetchAll();
  }, [setUserGroups, fetchAll]);

  useEffect(() => {
    const user = Auth.user;
    const { username } = Auth.user;
    const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
    let userType = groups ? groups[0] : 'user';
    getUser({ username, userType });
  }, [getUser]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseLine />
      <Switch>
        <Layout>
          <Route path='/record' component={ClientRecord} />
          <Route path='/reports' component={CareReports} />
          {isDeveloper(userGroups) && <Route path='/management' component={Management} />}
          <Redirect from='/' to='/management' />
        </Layout>
      </Switch>
    </MuiThemeProvider>
  );
}

export default withAuthenticator(App, false, [
  <SignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <ForgotPassword />,
  <RequireNewPassword />,
  <ConfirmSignUp />
]);
