import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Grid, Paper, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Hero from './Hero';
import CreateEdit from './CreateEdit';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  summary: {
    minWidth: '100%',
    minHeight: 260
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
            <Grid item lg={5} md={5} sm={6} xs={6}>
              <CreateEdit />
            </Grid>
            <Grid item lg={7} md={7} sm={6} xs={6}>
              <Summary />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const Summary = () => {
  const classes = useStyles();
  const data = useStoreState(state => state.managementModel.data);
  console.log(Object.entries(data));
  return (
    <Paper className={classes.summary}>
      <List>
        <ListItem>Company name: {data['company'].name}</ListItem>
        <ListItem>Company Logo URL: {data['company'].companyLogoUrl}</ListItem>

        {data['staff'].map((item, index) => (
          <>
            <ListItem>
              Staff ({index}) username {item.userName}
            </ListItem>
            <ListItem>Staff type {item.userType}</ListItem>
          </>
        ))}
      </List>
    </Paper>
  );
};
