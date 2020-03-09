import React from 'react';
import { useStoreState } from 'easy-peasy';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  summary: {
    minWidth: '100%',
    minHeight: 260
  }
}));

const Summary = () => {
  const classes = useStyles();
  const data = useStoreState(state => state.managementModel.data);
  return (
    <Paper className={classes.summary}>
      <List>
        <ListItem>Company name: {data['company'].name}</ListItem>
        <ListItem>Company Logo URL: {data['company'].companyLogoUrl}</ListItem>

        {data['staff'].map((item, index) => (
          <>
            <ListItem key={index}>
              Staff ({index}) username {item.userName}
            </ListItem>
            <ListItem>Staff type {item.userType}</ListItem>
          </>
        ))}
      </List>
    </Paper>
  );
};

export default Summary;
