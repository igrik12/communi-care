import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { Controller, useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Paper, Grid, FormControl, InputLabel, Input, InputAdornment, Select, MenuItem } from '@material-ui/core';

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

const RecordMeta = ({ control, setValue, register }) => {
  const classes = useStyles();

  const clients = useStoreState(state => state.clients);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [createdAt, setCreatedAt] = useState(null);

  const handleDateChange = date => {
    setValue('createdAt', date);
    setCreatedAt(date);
  };

  useEffect(() => {
    register({ name: 'createdAt', required: true });
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [register]);

  return (
    <>
      <Paper elevation={3} className={classes.menu}>
        <Grid container justify='flex-start' alignItems='center' spacing={3}>
          <Grid item sm={6} xs={6} md={3} lg={3}>
            <FormControl required className={classes.margin}>
              <InputLabel htmlFor='username'>Staff Member</InputLabel>
              <Input
                id='username'
                value={Auth.user.username}
                startAdornment={
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6} md={3} lg={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ marginBottom: 16 }}
                margin='normal'
                label='Date'
                name='createdAt'
                inputRef={register}
                format='MM/dd/yyyy'
                value={createdAt}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={6} xs={6} md={3} lg={3}>
            <FormControl required className={classes.formControl}>
              <InputLabel shrink ref={inputLabel} id='select-client-label'>
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
          </Grid>
          <Grid item sm={6} xs={6} md={3} lg={3}>
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
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default RecordMeta;