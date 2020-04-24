import React, { useState, useEffect } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { STAFF } from 'utils/constants';
import { uploadPhoto } from 'utils/helpers';
import permissions from 'utils/permissions.json';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ButtonGroup, Grid, Box } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermIdentity from '@material-ui/icons/PermIdentity';
import Lock from '@material-ui/icons/Lock';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AddPhotoDialog from './AddPhotoDialog';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    marginTop: theme.spacing(1),
    minWidth: '100%',
  },
  buttonGroup: {
    marginTop: theme.spacing(1),
  },
}));

const AddStaff = () => {
  const classes = useStyles();
  const [allPermissions, setAllPermissions] = useState([]);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, reset, errors } = useForm();
  const submitEntity = useStoreActions((actions) => actions.managementModel.submitEntity);
  const companies = useStoreState((state) => state.companies);
  const staff = useStoreState((state) => state.staff);

  const onSubmit = async (data) => {
    submitEntity({ type: STAFF, data });
    await uploadPhoto(file);
    reset();
    setValue('permissions', []);
    setValue('company', null);
    setAllPermissions([]);
  };

  const onPick = (data) => {
    setValue('photoUrl', data.file.name);
    setFile(data.file);
  };

  const onReset = () => {
    reset();
    setValue('permissions', []);
    setValue('companyId', null);
    setAllPermissions([]);
  };

  useEffect(() => {
    register({ name: 'permissions' });
    register({ name: 'companyId' });
    setValue('permissions', []);
  }, [register, setValue]);

  const validateUsername = (value) => {
    return !staff.some((st) => st.username.toLowerCase() === value.toLowerCase());
  };

  const validateEmail = (value) => {
    return !staff.some((st) => st.email.toLowerCase() === value.toLowerCase());
  };

  return (
    <>
      <Box style={{ padding: '0 10px' }} display='flex' justifyContent='space-between'>
        <Typography gutterBottom variant='h5' component='h2'>
          Add Staff
        </Typography>
        <Avatar src={file && URL.createObjectURL(file)} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              required
              error={errors.firstName}
              inputRef={register({
                required: true,
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
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
                required: true,
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
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
                validate: validateUsername ? undefined : 'Username already exists!',
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PermIdentity />
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email />
                  </InputAdornment>
                ),
              }}
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
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} name='companyId' label='Company' variant='outlined' />}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Autocomplete
              required
              className={classes.textField}
              options={['user', 'admin', 'developer']}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
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
              renderOption={(option) => <React.Fragment>{option.title}</React.Fragment>}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} name='permissions' label='Permission' variant='outlined' />
              )}
            />
          </Grid>
          <Grid style={{margin:'5px 0'}} item lg={12} md={12} sm={12} xs={12}>
            <Box display='flex' alignItems='center'>
              <Button onClick={() => setOpen(true)} variant='outlined' color='primary' startIcon={<PhotoCamera />}>
                Upload photo
              </Button>
              <FormControlLabel
                style={{ marginLeft: 'auto' }}
                labelPlacement='start'
                control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked />}
                label='Active'
              />
            </Box>
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
      <AddPhotoDialog open={open} setOpen={setOpen} onPick={onPick} />
    </>
  );
};

export default AddStaff;
