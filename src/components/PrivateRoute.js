import React from 'react';
import { Route, Redirect } from 'react-router';
import { useStoreState } from 'easy-peasy';
import { hasPermissions } from '../utils/permissions';
import _ from 'lodash';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
    margin: theme.spacing(2)
  },
  media: {
    width: '100%',
    minHeight: '80%'
  }
}));

function PrivateRoute({ children, ...rest }) {
  const user = useStoreState(state => state.user);
  const { permission, redirect } = rest;

  if (_.isEmpty(user)) return <AuthLoader />;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasPermissions(user, permission) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect || '/unauthorised',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const AuthLoader = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Skeleton animation='wave' variant='circle' width={40} height={40} />}
        title={<Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation='wave' height={10} width='40%' />}
      />

      <Skeleton animation='wave' variant='rect' className={classes.media} />

      <CardContent>
        <React.Fragment>
          <Skeleton animation='wave' height={300} style={{ marginBottom: 6 }} />
        </React.Fragment>
      </CardContent>
    </Card>
  );
};

export default PrivateRoute;
