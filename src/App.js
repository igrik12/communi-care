import React, { useMemo, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Route, Switch, Redirect } from 'react-router';
import { withAuthenticator, SignIn, ConfirmSignIn, VerifyContact, ForgotPassword } from 'aws-amplify-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, deepPurple } from '@material-ui/core/colors';
import CssBaseLine from '@material-ui/core/CssBaseline';
import ClientRecord from './components/Pages/ClientRecord';
import CareReports from './components/Pages/CareReports';
import Layout from './components/Layout';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listStaffs, listClients } from './graphql/queries';
import { createStaff, createClient } from './graphql/mutations';

const fakeClients = ['Bob', 'John', 'George', 'Amy'];

function App() {
  const themeColor = useStoreState(state => state.layoutModel.themeColor);
  const getStaff = useStoreActions(actions => actions.getStaff);
  const theme = useMemo(() => {
    return createMuiTheme({
      toolBar: {
        dark: deepPurple[800],
        light: blue[500]
      },
      palette: {
        type: themeColor,
        primary: {
          // light: will be calculated from palette.primary.main,
          main: blue[600],
          dark: blue[800],
          light: blue[300]

          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: '#DB2828',
          main: '#DB2828',
          // dark: will be calculated from palette.secondary.main,
          contrastText: '#ffcc00'
        },
        fontFamily: ['Roboto', 'sans-serif']
      }
    });
  }, [themeColor]);

  useEffect(() => {
    const apiCall = async () => {
      const user = Auth.user;
      // Fetch the staff data at the start up
      getStaff(Auth.user.username);
      const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
      let userType = 'user';
      if (groups.length === 1 && groups[0] === 'admin') {
        userType = 'admin';
      }
      const filterCondition = { filter: { userName: { eq: Auth.user.username } } };
      const result = await API.graphql(graphqlOperation(listStaffs, filterCondition));
      if (!result.data.listStaffs.items.length) {
        const inputDetails = { input: { userName: Auth.user.username, userType: userType } };
        await API.graphql(graphqlOperation(createStaff, inputDetails));
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
          <Redirect exact from='/' to='/record' />
        </Layout>
      </Switch>
    </MuiThemeProvider>
  );
}

export default withAuthenticator(App, false, [<SignIn />, <ConfirmSignIn />, <VerifyContact />, <ForgotPassword />]);
