import React from 'react';
import CompanyEditType from './CompanyEditType';
import AddStaff from './AddStaff';
import AddClient from './AddClient';
import CompanySelectSwitch from './CompanySelectSwitch';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

export default function Create() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify='space-around' spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <CompanyEditType />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Divider />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <AddStaff />
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}>
          <Divider orientation='vertical' />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <AddClient />
        </Grid>
      </Grid>
    </div>
  );
}
