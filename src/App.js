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
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listStaffs, listClients } from './graphql/queries';
import { createStaff, createClient } from './graphql/mutations';

const fakeClients = ['Bob', 'John', 'George', 'Amy'];

function App() {
  const themeColor = useStoreState(state => state.layoutModel.themeColor);
  const setUserGroups = useStoreActions(actions => actions.setUserGroups);
  const userGroups = useStoreState(state => state.userGroups);
  const setUser = useStoreActions(actions => actions.setUser);
  const getUser = useStoreActions(actions => actions.getUser);
  const getPermissions = useStoreActions(actions => actions.getPermissions);

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
    getPermissions();
  }, [setUserGroups, getPermissions]);

  //This is temporary hack for development user management
  useEffect(() => {
    const apiCall = async () => {
      const user = Auth.user;
      const { username } = Auth.user;
      const { email, phone_number } = Auth.user.attributes;

      const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
      let userType = groups ? groups[0] : 'user';

      const filterCondition = { filter: { username: { eq: username } } };
      let result;
      try {
        result = await API.graphql(graphqlOperation(listStaffs, filterCondition));
      } catch (error) {
        throw Error(`Failed to retrieve staff with username ${username}!. Error: ${error}`);
      }

      if (!result.data.listStaffs.items.length) {
        const inputDetails = { input: { username, userType, email, phone_number } };
        try {
          const ret = await API.graphql(graphqlOperation(createStaff, inputDetails));
          setUser(ret.data.createStaff);
        } catch (error) {
          throw Error(`Failed to create new staff! Error: ${error}`);
        }
      } else {
        getUser({ username, userType });
      }

      // Temp to populate fake clients to DB
      const res = await API.graphql(graphqlOperation(listClients));
      if (!res.data.listClients.items.length) {
        fakeClients.forEach(async client => {
          const clientDetails = { input: { name: client } };
          await API.graphql(graphqlOperation(createClient, clientDetails));
        });
      }
    };
    apiCall();
  }, [getUser, setUser]);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseLine />
      <Switch>
        <Layout>
          <Route path='/record' component={ClientRecord} />
          <Route path='/reports' component={CareReports} />
          {isDeveloper(userGroups) && <Route path='/management' component={Management} />}
          <Redirect from='/' to='/record' />
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
