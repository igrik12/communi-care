import React from 'react';
import { useStoreState } from 'easy-peasy';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    padding: theme.spacing(2),
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
  return (
    <div className={classes.root}>
      <Typography className={classes.code} variant='h1'>
        401
      </Typography>
      <Typography variant='h2'>Unauthorised</Typography>
      <Typography variant='subtitle1'>User is not active. Please contact administrator for activation.</Typography>
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
