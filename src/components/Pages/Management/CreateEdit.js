import React from 'react';
import { useStoreState } from 'easy-peasy';

// Material-UI imports
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Selection from './Selection';
import Create from './Create';
import Edit from './Edit';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    minHeight: '100%'
  },
  menu: {
    padding: theme.spacing(2), 
    height:'100%'
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
