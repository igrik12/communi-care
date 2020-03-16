import React from 'react';

// Material-UI imports
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Hero from './Hero';
import Summary from './Summary';
import CrateEditManagement from './CrateEditManagement';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

export default function Management() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} ms={12}>
          <Hero />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={8} md={12} sm={12} xs={12}>
              <CrateEditManagement />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Summary />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
