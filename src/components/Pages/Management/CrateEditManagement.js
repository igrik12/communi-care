import React from 'react';
import AddCompany from './AddCompany';
import AddStaff from './AddStaff';
import AddClient from './AddClient';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    minWidth: '100%'
  },
  divider: {
    margin: '0 auto'
  },
  menu: {
    padding: theme.spacing(2),
    height: '100%'
  }
}));

function CrateEditManagement({ width }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.menu}>
        <Grid container  spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <AddCompany />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Divider />
          </Grid>
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <AddStaff />
          </Grid>
          <Grid item lg={1} md={12} sm={12} xs={12}>
            <Divider
              className={classes.divider}
              orientation={width === 'lg' || width === 'xl' ? 'vertical' : 'horizontal'}
              variant='middle'
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <AddClient />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default withWidth()(CrateEditManagement);
