import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ButtonGroup, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  textField: {
    marginTop: theme.spacing(1),
    minWidth: '100%'
  },
  buttonGroup: {
    marginTop: theme.spacing(1)
  }
}));

const AddStaff = () => {
  const classes = useStyles();
  const [allPermissions, setAllPermissions] = React.useState([]);
  const { register, handleSubmit, setValue, reset, errors } = useForm();
  const addStaff = useStoreActions(actions => actions.managementModel.addStaff);
  const getStaff = useStoreActions(actions => actions.managementModel.getStaff);
  const permissions = useStoreState(state => state.permissions);
  const staff = useStoreState(state => state.managementModel.staff);

  const onSubmit = data => {
    addStaff(data);
    reset();
    setValue('permissions', []);
    setValue('userType', null);
    setAllPermissions([]);
  };

  const onReset = () => {
    reset();
    setValue('permissions', []);
    setValue('userType', null);
    setAllPermissions([]);
  };

  useEffect(() => {
    getStaff();
  }, []);

  React.useEffect(() => {
    register({ name: 'permissions' });
    setValue('permissions', []);
  }, [register, setValue]);

  return (
    <>
      <Typography gutterBottom variant='h5' component='h2'>
        Staff
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              required
              inputRef={register({
                required: true,
                minLength: 5,
                validate: value => !staff.some(st => st.username === value)
              })}
              className={classes.textField}
              name='username'
              label='Username'
              variant='outlined'
              autoComplete='off'
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              required
              inputRef={register({ required: true })}
              className={classes.textField}
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              autoComplete='off'
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              required
              inputRef={register({ required: true })}
              className={classes.textField}
              name='phone_number'
              label='Phone number'
              variant='outlined'
              autoComplete='new-phone-number'
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              required
              inputRef={register({ required: true })}
              className={classes.textField}
              name='email'
              type='email'
              label='Email'
              variant='outlined'
              autoComplete='off'
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Autocomplete
              required
              className={classes.textField}
              options={['user', 'admin', 'developer']}
              getOptionLabel={option => option}
              renderInput={params => (
                <TextField
                  {...params}
                  inputRef={register({ required: true })}
                  name='userType'
                  label='User type'
                  variant='outlined'
                />
              )}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Autocomplete
              className={classes.textField}
              options={permissions}
              multiple
              disableCloseOnSelect
              onChange={(e, data) => {
                setValue('permissions', data);
                setAllPermissions(data);
              }}
              value={allPermissions}
              renderOption={option => <React.Fragment>{option.title}</React.Fragment>}
              getOptionLabel={option => option.title}
              renderInput={params => <TextField {...params} name='permissions' label='Permission' variant='outlined' />}
            />
          </Grid>
          <ButtonGroup fullWidth className={classes.buttonGroup}>
            <Button color='primary' onClick={onReset}>
              Reset
            </Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </ButtonGroup>
        </Grid>
      </form>
    </>
  );
};

export default AddStaff;
