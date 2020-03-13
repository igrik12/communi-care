import React from 'react';
import { useStoreState } from 'easy-peasy';

import MUIDataTable from 'mui-datatables';
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
  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant='h4' component='h2'>
        Summary
      </Typography>
      <Grid className={classes.summary} container spacing={1}>
        <Grid item lg={6} md={6}>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              <Typography>
                <Box fontWeight='fontWeightLight'>Company name</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Box fontWeight='fontWeightLight'>Company Logo URL</Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6}>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              <Typography className={classes.rightItem}>
                <Box fontWeight='fontWeightLight'>{data['company'].name}</Box>
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.rightItem}>
                <Box fontWeight='fontWeightLight'>{data['company'].companyLogoUrl}</Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Divider className={classes.divider} />
          {data.staff.length ? (
            <Typography variant='h6' component='h2'>
              <Box fontWeight='fontWeightLight'>Staff</Box>
            </Typography>
          ) : null}
          <List className={classes.list} component='nav'>
            {data.staff &&
              data.staff.map((item, index) => (
                <ListItem button key={index}>
                  {item.username}
                </ListItem>
              ))}
          </List>
          <Divider className={classes.divider} />
          {data.clients.length ? (
            <Typography variant='h6' component='h2'>
              <Box fontWeight='fontWeightLight'>Clients</Box>
            </Typography>
          ) : null}
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
            <Button color='primary'>Submit</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Summary;
