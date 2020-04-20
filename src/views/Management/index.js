import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import TabsPanel from './TabsPanel';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Management() {
  const classes = useStyles();
  const setupSubscription = useStoreActions((actions) => actions.managementModel.setupSubscription);
  const unsubscribe = useStoreActions((actions) => actions.managementModel.unsubscribe);
  useEffect(() => {
    setupSubscription();
    return () => {
      unsubscribe();
    };
  }, [setupSubscription, unsubscribe]);
  return (
    <div className={classes.root}>
      <TabsPanel />
    </div>
  );
}
