import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { CLIENT } from 'utils/constants';

// Material-UI imports
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    marginTop: theme.spacing(1)
  },
  buttonGroup: {
    marginTop: theme.spacing(1)
  }
}));

const AddClient = () => {
  const classes = useStyles();
  const submitEntity = useStoreActions(actions => actions.managementModel.submitEntity);
  const companies = useStoreState(state => state.companies);
  const residences = useStoreState(state => state.residences);
  const { register, handleSubmit, reset, setValue } = useForm();

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const handleDateChange = date => {
    setValue('dateOfBirth', date);
    setDateOfBirth(date);
  };

  React.useEffect(() => {
    register({ name: 'dateOfBirth', required: true });
  }, [register]);

  const onHandleSubmit = data => {
    submitEntity({ type: CLIENT, data });
    reset();
  };

  return (
    <>
      <Typography gutterBottom variant='h5' component='h2'>
        Client
      </Typography>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                inputRef={register({ required: true })}
                label='First Name'
                name='firstName'
                variant='outlined'
                fullWidth
                autoComplete='off'
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                inputRef={register({ required: true })}
                label='Last Name'
                name='lastName'
                variant='outlined'
                fullWidth
                autoComplete='off'
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  inputVariant='outlined'
                  name='dateOfBirth'
                  label='Date of Birth'
                  format='MM/dd/yyyy'
                  value={dateOfBirth}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Autocomplete
              required
              className={classes.formControl}
              options={residences}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField
                  {...params}
                  inputRef={register({ required: true })}
                  name='recidency'
                  label='Recidency'
                  variant='outlined'
                />
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Autocomplete
              required
              className={classes.textField}
              options={companies}
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField
                  {...params}
                  inputRef={register({ required: true })}
                  name='company'
                  label='Company'
                  variant='outlined'
                />
              )}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              labelPlacement='start'
              control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked />}
              label='Active'
            />
          </Grid>
          <ButtonGroup fullWidth className={classes.buttonGroup}>
            <Button color='primary'>Reset</Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </ButtonGroup>
        </Grid>
      </form>
    </>
  );
};

export default AddClient;
