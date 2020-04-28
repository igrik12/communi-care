import React from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useStoreState } from 'easy-peasy';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  code: {
    fontWeight: 600,
  },
}));

const logout = async (history) => {
  await Auth.signOut();
  history.push('/');
};

function Unauthorised({ history }) {
  const classes = useStyles();
  const user = useStoreState((state) => state.user);
  if (_.isEmpty(user)) history.push('/');
  return (
    <div className={classes.root}>
      <Typography className={classes.code} variant='h1'>
        401
      </Typography>
      <Typography variant='h2'>Unauthorised</Typography>
      <Typography align='center' variant='subtitle1'>
        User is not active. Please contact administrator for activation.
      </Typography>
      <Button
        onClick={() => logout(history)}
        size='large'
        className={classes.button}
        color='primary'
        endIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>
    </div>
  );
}

export default withRouter(Unauthorised);
