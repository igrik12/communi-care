import React from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { STAFF } from 'utils/constants';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ButtonGroup, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
  const submitEntity = useStoreActions(actions => actions.managementModel.submitEntity);
  const permissions = useStoreState(state => state.permissions);
  const companies = useStoreState(state => state.companies);
  const staff = useStoreState(state => state.staff);

  const onSubmit = data => {
    submitEntity({ type: STAFF, data });
    reset();
    setValue('permissions', []);
    setValue('company', null);
    setAllPermissions([]);
  };

  const onReset = () => {
    reset();
    setValue('permissions', []);
    setValue('companyId', null);
    setAllPermissions([]);
  };

  React.useEffect(() => {
    register({ name: 'permissions' });
    register({ name: 'companyId' });
    setValue('permissions', []);
  }, [register, setValue]);

  const validateUsername = value => {
    return !staff.some(st => st.username.toLowerCase() === value.toLowerCase());
  };

  const validateEmail = value => {
    return !staff.some(st => st.email.toLowerCase() === value.toLowerCase());
  };

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
              error={errors.firstName}
              inputRef={register({
                required: true
              })}
              className={classes.textField}
              name='firstName'
              label='First Name'
              variant='outlined'
              autoComplete='off'
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              required
              error={errors.lastName}
              inputRef={register({
                required: true
              })}
              className={classes.textField}
              name='lastName'
              label='Last Name'
              variant='outlined'
              autoComplete='off'
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              required
              error={errors.username}
              inputRef={register({
                required: true,
                minLength: 4,
                validate: validateUsername ? undefined : 'Username already exists!'
              })}
              className={classes.textField}
              name='username'
              label='Username'
              variant='outlined'
              autoComplete='off'
            />
            <ErrorMessage style={{ color: 'red' }} errors={errors} name='username' as='p' />
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
              error={errors.email}
              inputRef={register({ required: true, validate: validateEmail ? undefined : 'Email is already in use' })}
              className={classes.textField}
              name='email'
              type='email'
              label='Email'
              variant='outlined'
              autoComplete='off'
            />
            <ErrorMessage style={{ color: 'red' }} errors={errors} name='email' as='p' />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Autocomplete
              required
              freeSolo
              onChange={(e, data) => {
                setValue('companyId', data.id);
              }}
              className={classes.textField}
              options={companies}
              getOptionLabel={option => option.name}
              renderInput={params => <TextField {...params} name='companyId' label='Company' variant='outlined' />}
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
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
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControlLabel
              style={{ marginLeft: 'auto' }}
              labelPlacement='start'
              control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked />}
              label='Active'
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
