import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
// Material-UI imports
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Hero from './Hero';
import CrateEditManagement from './CrateEditManagement';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

export default function Management() {
  const classes = useStyles();
  const setupSubscription = useStoreActions(actions => actions.managementModel.setupSubscription);
  const unsubscribe = useStoreActions(actions => actions.managementModel.unsubscribe);
  useEffect(() => {
    setupSubscription();
    return () => {
      unsubscribe();
    };
  }, [setupSubscription, unsubscribe]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} ms={12}>
          <Hero />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CrateEditManagement />
        </Grid>
      </Grid>
    </div>
  );
}