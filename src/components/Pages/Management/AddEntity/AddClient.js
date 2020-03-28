import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm, Controller } from 'react-hook-form';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
  const { register, handleSubmit, reset, setValue, control } = useForm();

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const handleDateChange = date => {
    setValue('dateOfBirth', date);
    setDateOfBirth(date);
  };

  useEffect(() => {
    register({ name: 'dateOfBirth', required: true });
    register({ name: 'clientCompanyId' });
  }, [register, setValue]);

  const onSubmit = data => {
    console.log(data);
    // submitEntity({ type: CLIENT, data });
    reset();
    setValue('clientCompanyId', null);
  };

  const onReset = () => {
    reset();
    setValue('clientCompanyId', null);
  };

  return (
    <>
      <Typography gutterBottom variant='h5' component='h2'>
        Client
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                inputRef={register({ required: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                label='Last Name'
                name='lastName'
                variant='outlined'
                fullWidth
                autoComplete='off'
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
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
            <Controller
              as={
                <Autocomplete
                  required
                  className={classes.formControl}
                  options={residences}
                  autoHighlight
                  renderOption={option => (
                    <React.Fragment>
                      {option.name} {option.address?.postCode}
                    </React.Fragment>
                  )}
                  getOptionLabel={option => option.name || ''}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Residence'
                      variant='outlined'
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'disabled'
                      }}
                    />
                  )}
                />
              }
              onChange={([event, data]) => {
                return data;
              }}
              name='clientResidenceId'
              control={control}
              defaultValue={residences[0] || ''}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Controller
              as={
                <Autocomplete
                  required
                  className={classes.formControl}
                  options={companies}
                  autoHighlight
                  getOptionLabel={option => option.name || ''}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Company'
                      variant='outlined'
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'disabled'
                      }}
                    />
                  )}
                />
              }
              onChange={([event, data]) => {
                return data;
              }}
              name='clientCompanyId'
              control={control}
              defaultValue={companies[0] || {}}
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

export default AddClient;
