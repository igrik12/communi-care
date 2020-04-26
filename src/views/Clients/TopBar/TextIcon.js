import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  icon: {
    marginLeft: 'auto',
  },
}));

export default function TextIcon({ text = 'Active', color = 'primary' }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CheckCircle className={classes.icon} color={color} />
      <Typography variant='subtitle1'>{text}</Typography>
    </div>
  );
}
