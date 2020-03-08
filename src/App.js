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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, deepPurple } from '@material-ui/core/colors';
import CssBaseLine from '@material-ui/core/CssBaseline';
import ClientRecord from './components/Pages/ClientRecord';
import CareReports from './components/Pages/CareReports';
import Management from './components/Pages/Management/Management';
import Layout from './components/Layout';
import { isDeveloper } from './utils/permissions';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
import { listStaffs, listClients, getStaff } from './graphql/queries';
import { createStaff, createClient } from './graphql/mutations';

const fakeClients = ['Bob', 'John', 'George', 'Amy'];

function App() {
  const themeColor = useStoreState(state => state.layoutModel.themeColor);
  const setUserGroups = useStoreActions(actions => actions.setUserGroups);
  const userGroups = useStoreState(state => state.userGroups);
  const setStaff = useStoreActions(actions => actions.setStaff);
  const getStaff = useStoreActions(actions => actions.getStaff);
  const theme = useMemo(() => {
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
      toolBar: {
        dark: deepPurple[800],
        light: blue[500]
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
        fontFamily: ['Roboto', 'sans-serif']
      }
    });
  }, [themeColor]);

  useEffect(() => {
    const groups = Auth.user.signInUserSession.accessToken.payload['cognito:groups'];
    setUserGroups(groups);
  }, []);

  //This is temporary hack for development user management
  useEffect(() => {
    const apiCall = async () => {
      const user = Auth.user;

      const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
      let userType = groups ? groups[0] : 'user';

      const filterCondition = { filter: { userName: { eq: Auth.user.username } } };
      const result = await API.graphql(graphqlOperation(listStaffs, filterCondition));
      if (!result.data.listStaffs.items.length) {
        const inputDetails = { input: { userName: Auth.user.username, userType: userType } };
        const ret = await API.graphql(graphqlOperation(createStaff, inputDetails));
        setStaff(ret.data.createStaff);
      } else {
        getStaff(Auth.user.username);
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
  }, []);
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
