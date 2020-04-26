import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function TextAvatar({ avatarUrl, text }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar src={avatarUrl} className={classes.large} />
      <Typography variant='subtitle1'>{text}</Typography>
    </div>
  );
}
