import React, { useMemo, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { Route, Switch, Redirect } from 'react-router';
import { withAuthenticator, SignIn, ConfirmSignIn, VerifyContact, ForgotPassword } from 'aws-amplify-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, deepPurple, teal } from '@material-ui/core/colors';
import CssBaseLine from '@material-ui/core/CssBaseline';
import ClientRecord from './components/Pages/ClientRecord';
import CareReports from './components/Pages/CareReports';
import Layout from './components/Layout';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listStaffs } from './graphql/queries';
import { createStaff } from './graphql/mutations';

const MyTheme = {
  navBar: {
    backgroundColor: '#1A2035',
    borderColor: '#1A2035'
  }
};

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  defaultCountryCode: '44'
};

function App() {
  const themeColor = useStoreState(state => state.layoutModel.themeColor);
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
      try {
        const user = Auth.user;
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
        let userType = 'user';
        if (groups.length === 1 && groups[0] === 'admin') {
          userType = 'admin';
        }
        const filterCondition = { filter: { userName: { eq: Auth.user.username } } };
        const result = await API.graphql(graphqlOperation(listStaffs, filterCondition));
        if (!result.data.listStaffs.items.length) {
          const inputDetails = { input: { userName: Auth.user.username, userType: userType } };
          const created = await API.graphql(graphqlOperation(createStaff, inputDetails));
        }
      } catch (error) {
        throw Error('Failed to add new staff to DB. Error: ', error);
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

export default withAuthenticator(App, true, [<SignIn />, <ConfirmSignIn />, <VerifyContact />, <ForgotPassword />]);
