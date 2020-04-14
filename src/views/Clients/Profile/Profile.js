import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  gridItem: {
    marginTop: theme.spacing(1),
  },
}));

export default function Profile({ selectedClient, clients, clientInfo }) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Client Profile</h4>
        <p className={classes.cardCategoryWhite}>Detail overview of personal information</p>
      </CardHeader>
      <CardBody>
        <Grid container spacing={2}>
          <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label='First Name'
              InputProps={{
                readOnly: true,
              }}
              value={clientInfo?.firstName}
            />
          </Grid>
          <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label='Last Name'
              InputProps={{
                readOnly: true,
              }}
              value={clientInfo?.lastName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item className={classes.gridItem} xs={12} sm={12} md={4} lg={12}>
            <TextField
              fullWidth
              label='Company'
              InputProps={{
                readOnly: true,
              }}
              value={clientInfo?.company?.name}
            />
          </Grid>
          <Grid item className={classes.gridItem} xs={12} sm={12} md={4} lg={6}>
            <TextField
              fullWidth
              label='Date of Birth'
              InputProps={{
                readOnly: true,
              }}
              value={new Date(clientInfo?.dateOfBirth).toLocaleDateString()}
            />
          </Grid>
          <Grid item className={classes.gridItem} xs={12} sm={12} md={4} lg={6}>
            <TextField
              fullWidth
              label='Residence'
              InputProps={{
                readOnly: true,
              }}
              value={clientInfo?.residence?.name}
            />
          </Grid>
        </Grid>
      </CardBody>
      <CardFooter>
       
      </CardFooter>
    </Card>
  );
}
