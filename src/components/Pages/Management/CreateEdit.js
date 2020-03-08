import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Selection from './Selection';
import Create from './Create';
import Edit from './Edit';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    minHeight: '500px'
  },
  menu: {
    padding: theme.spacing(2)
  }
}));

export default function CreateEdit() {
  const classes = useStyles();
  const editModeOn = useStoreState(state => state.managementModel.editModeOn);
  const Current = editModeOn ? <Edit /> : <Create />;
  return (
    <div className={classes.root}>
      <Paper className={classes.menu}>
        <Selection />
        {Current}
      </Paper>
    </div>
  );
}
