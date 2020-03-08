import React from 'react';
import { Auth } from 'aws-amplify';

const isDeveloper = () => {
  const groups = Auth.user.signInUserSession.accessToken.payload['cognito:groups'];
  console.log(groups);
  return groups.includes('developer');
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isDeveloper() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
