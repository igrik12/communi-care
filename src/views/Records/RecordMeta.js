import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { Controller, useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Paper, Grid, FormControl, InputLabel, Input, InputAdornment, Select, MenuItem, Icon } from '@material-ui/core';
import Warning from '@material-ui/icons/Warning';

// Creative-tim imports
import Danger from 'components/Shared/Typography/Danger.js';
import Card from 'components/Shared/Card/Card.js';
import CardHeader from 'components/Shared/Card/CardHeader.js';
import CardIcon from 'components/Shared/Card/CardIcon.js';
import CardBody from 'components/Shared/Card/CardBody.js';
import CardFooter from 'components/Shared/Card/CardFooter.js';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  menu: {
    padding: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80%'
  }
}));

const RecordMeta = ({ control, setValue, register, createdAt }) => {
  const classes = useStyles();

  const clients = useStoreState(state => state.clients);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    register({ name: 'createdAt', required: true });
    setValue('createdAt', null);
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [register, setValue]);

  const handleDateChange = date => {
    setValue('createdAt', date);
  };

  return (
    <>
      <Grid container justify='flex-start' alignItems='center' spacing={3}>
        <Grid item sm={6} xs={12} md={6} lg={3}>
          <Card style={{ height: '120px' }}>
            <CardHeader color='danger' stats icon>
              <CardIcon color='danger'>
                <Icon style={{ fontSize: 25 }}>supervised_user_circle</Icon>
              </CardIcon>
            </CardHeader>
            <CardBody>
              <FormControl required className={classes.margin}>
                <InputLabel shrink ref={inputLabel} id='select-Staff-label'>
                  Staff
                </InputLabel>
                <Input id='username' value={Auth.user.username} />
              </FormControl>
            </CardBody>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12} md={6} lg={3}>
          <Card style={{ height: '120px' }}>
            <CardHeader color='warning' stats icon>
              <CardIcon color='warning'>
                <Icon style={{ fontSize: 25 }}>calendar_today</Icon>
              </CardIcon>
            </CardHeader>
            <CardBody style={{ padding: "7px 20px" }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <InputLabel shrink ref={inputLabel} id='select-Staff-label'>
                  Date
                </InputLabel>
                <KeyboardDatePicker
                  required
                  margin='normal'
                  format='MM/dd/yyyy'
                  onChange={handleDateChange}
                  value={createdAt}
                />
              </MuiPickersUtilsProvider>
            </CardBody>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12} md={6} lg={3}>
          <Card style={{ height: '120px' }}>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Icon style={{ fontSize: 25 }}>account_circle</Icon>
              </CardIcon>
            </CardHeader>
            <CardBody>
              <FormControl required className={classes.formControl}>
                <InputLabel shrink ref={inputLabel} id='select-Staff-label'>
                  Client
                </InputLabel>
                <Controller
                  as={
                    <Select labelId='select-client-label' id='select-client' displayEmpty labelWidth={labelWidth}>
                      {clients.map(client => (
                        <MenuItem key={client.id} value={client.id}>
                          {`${client.firstName} ${client.lastName}`}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  name='clientRecordClientId'
                  control={control}
                  defaultValue={clients[0]?.id ?? ''}
                />
              </FormControl>
            </CardBody>
          </Card>
        </Grid>
        <Grid item sm={6} xs={12} md={6} lg={3}>
          <Card style={{ height: '120px' }}>
            <CardHeader color='info' stats icon>
              <CardIcon color='info'>
                <Icon style={{ fontSize: 25 }}>view_day</Icon>
              </CardIcon>
            </CardHeader>
            <CardBody>
              <FormControl required className={classes.formControl}>
                <InputLabel shrink ref={inputLabel} id='select-shift-label'>
                  Shift
                </InputLabel>
                <Controller
                  as={
                    <Select labelId='select-shift-label' id='select-shift' displayEmpty labelWidth={labelWidth}>
                      <MenuItem value={'am'}>AM</MenuItem>
                      <MenuItem value={'pm'}>PM</MenuItem>
                      <MenuItem value={'night'}>Night</MenuItem>
                      <MenuItem value={'ld'}>LD</MenuItem>
                    </Select>
                  }
                  name='shift'
                  control={control}
                  defaultValue='am'
                />
              </FormControl>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RecordMeta;
