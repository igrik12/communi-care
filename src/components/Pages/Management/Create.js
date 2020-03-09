import React from 'react';
import CompanyEditType from './CompanyEditType';
import AddStaff from './AddStaff';
import AddClient from './AddClient';
import CompanySelectSwitch from './CompanySelectSwitch';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

export default function Create() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <CompanySelectSwitch />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <CompanyEditType />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <AddStaff />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <AddClient />
        </Grid>
      </Grid>
    </div>
  );
}
