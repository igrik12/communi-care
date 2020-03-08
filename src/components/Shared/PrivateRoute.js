import React from 'react';
import { useStoreState } from 'easy-peasy';
import { isDeveloper } from '../../utils/permissions';

function PrivateRoute({ children, ...rest }) {
  const userGroups = useStoreState(state => state.userGroups);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isDeveloper(userGroups) ? (
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

export default PrivateRoute;
