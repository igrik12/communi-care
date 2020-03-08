import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    padding: theme.spacing(2)
  }
}));

export default function Hero() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5' component='h2' gutterBottom>
          Management
        </Typography>
        <Typography className={classes.content} variant='body2' component='p' color='textSecondary'>
          This page is for company staff and client management, that allows a user to create new entities and manage
          their permissions.
        </Typography>
      </CardContent>
    </Card>
  );
}
