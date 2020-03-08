import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Hero from './Hero';
import CreateEdit from './CreateEdit';

const useStyles = makeStyles(theme => ({
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
            <Grid item lg={5} md={5} sm={6} xs={6}>
              <CreateEdit />
            </Grid>
            <Grid item lg={7} md={7} sm={6} xs={6}>
            <CreateEdit />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}