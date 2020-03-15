import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography, Box, Grid, Divider, Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    minHeight: '100%',
    padding: theme.spacing(2)
  },
  title: {
    textAlign: 'center'
  },
  summary: {
    marginTop: theme.spacing(2)
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  list: {
    overflow: 'auto',
    maxHeight: 250
  }
}));

const Summary = () => {
  const classes = useStyles();
  const data = useStoreState(state => state.managementModel.formData);
  const submitFormData = useStoreActions(actions => actions.managementModel.submitFormData);

  const handleSubmit = () => {
    submitFormData();
  };

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant='h4' component='h2'>
        Summary
      </Typography>
      <Grid className={classes.summary} container spacing={1}>
        <Grid item lg={6} md={6}>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              <Box fontWeight='fontWeightLight'>Company name</Box>
            </Grid>
            <Grid item>
              <Box fontWeight='fontWeightLight'>Company Logo URL</Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6}>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              <Box fontWeight='fontWeightLight'>{data['company'].name}</Box>
            </Grid>
            <Grid item>
              <Box fontWeight='fontWeightLight'>{data['company'].companyLogoUrl}</Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Divider className={classes.divider} />
          {data.staff.length ? <Box fontWeight='fontWeightLight'>Staff</Box> : null}
          <List className={classes.list} component='nav'>
            {data.staff &&
              data.staff.map((item, index) => (
                <ListItem button key={index}>
                  {item.username}
                </ListItem>
              ))}
          </List>
          <Divider className={classes.divider} />
          {data.clients.length ? <Box fontWeight='fontWeightLight'>Clients</Box> : null}
          <List className={classes.list} component='nav'>
            {data.clients &&
              data.clients.map((client, index) => (
                <ListItem button key={index}>
                  {client.name}
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid item style={{ marginLeft: 'auto' }}>
          <ButtonGroup>
            <Button color='secondary'>Reset</Button>
            <Button onClick={handleSubmit} color='primary'>
              Submit
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Summary;
