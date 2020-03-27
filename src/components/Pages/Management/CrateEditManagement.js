import React from 'react';
import AddCompany from './AddEntity/AddCompany';
import AddStaff from './AddEntity/AddStaff';
import AddClient from './AddEntity/AddClient';
import AddResidence from './AddEntity/AddResidence';

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
        <Grid container spacing={2}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <AddCompany />
          </Grid>
          <Grid item lg={1} md={12} sm={12} xs={12}>
            <Divider
              className={classes.divider}
              orientation={width === 'lg' || width === 'xl' ? 'vertical' : 'horizontal'}
              variant='middle'
            />
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <AddResidence />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Divider />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <AddStaff />
          </Grid>
          <Grid item lg={1} md={12} sm={12} xs={12}>
            <Divider
              className={classes.divider}
              orientation={width === 'lg' || width === 'xl' ? 'vertical' : 'horizontal'}
              variant='middle'
            />
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <AddClient />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default withWidth()(CrateEditManagement);
