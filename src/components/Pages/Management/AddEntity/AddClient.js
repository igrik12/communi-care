import React from 'react';
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
  const { register, handleSubmit, reset, control } = useForm();

  const onSubmit = clientData => {
    const data = {
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      dateOfBirth: clientData.dateOfBirth,
      clientCompanyId: clientData.company.id,
      clientResidenceId: clientData.residence.id,
      isActive: clientData.isActive
    };
    submitEntity({ type: CLIENT, data });
    reset();
  };

  const onReset = () => {
    reset();
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
                  inputRef={register}
                  name='dateOfBirth'
                  label='Date of Birth'
                  format='MM/dd/yyyy'
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
                  getOptionLabel={option => option.name}
                  renderOption={option => (
                    <React.Fragment>
                      {option.name} {option.address?.postCode}
                    </React.Fragment>
                  )}
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
              onChange={([, data]) => {
                return data;
              }}
              defaultValue={residences[0]}
              control={control}
              name='residence'
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
              onChange={([, data]) => {
                return data;
              }}
              name='company'
              defaultValue={companies[0]}
              control={control}
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
