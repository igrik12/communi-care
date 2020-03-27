import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { CLIENT } from 'utils/constants';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import _ from 'lodash';

//MUI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import AutoComplete from '@material-ui/lab/AutoComplete';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 350
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  field: {
    flexGrow: 1,
    margin: theme.spacing(1),
    maxWidth: 350
  },
  btnGroup: {
    margin: theme.spacing(1),
    marginLeft: 'auto'
  }
}));

export default function EditClient() {
  const [client, setClient] = useState();
  const [company, setCompany] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const { register, handleSubmit, setValue } = useForm();
  const updateEntity = useStoreActions(actions => actions.managementModel.updateEntity);
  const classes = useStyles();

  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const clients = useStoreState(state => state.clients);
  const companies = useStoreState(state => state.companies);
  const residences = useStoreState(state => state.residences);
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);

  const handleOnSubmit = data => {
    const updateDetails = { id: client.id, dateOfBirth, ...data };
    updateEntity({ type: CLIENT, data: updateDetails });
    setEditOpen({ open: false });
  };

  const handleDateChange = date => {
    setValue('dateOfBirth', date);
    setDateOfBirth(date);
  };

  useEffect(() => {
    register({ name: 'clientCompanyId', required: true });
    register({ name: 'clientResidenceId', required: true });
  }, [register, setValue]);

  useEffect(() => {
    const match = clients.find(client => client.id === editOpen.id);
    setClient(match);
    const companyMatch = companies.find(company => company.client.items.some(item => item.id === match.id));
    setCompany(companyMatch);
  }, [editOpen.id, clients, companies]);

  useEffect(() => {
    setDateOfBirth(client?.dateOfBirth);
  }, [client, setDateOfBirth]);

  if (_.isEmpty(client)) return null;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
        EDIT
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <TextField
          label='First Name'
          className={classes.field}
          inputRef={register({ required: true })}
          name='firstName'
          defaultValue={client.firstName}
        />
        <TextField
          label='Last Name'
          className={classes.field}
          inputRef={register({ required: true })}
          name='lastName'
          defaultValue={client.lastName}
        />
        <FormControl className={classes.field} variant='outlined'>
          <AutoComplete
            required
            onChange={(e, data) => {
              setValue('clientCompanyId', data?.id);
            }}
            className={classes.formControl}
            options={companies}
            defaultValue={company}
            getOptionLabel={option => option.name ?? ''}
            renderInput={params => <TextField {...params} name='clientCompanyId' label='Company' variant='outlined' />}
          />
        </FormControl>
        <FormControl className={classes.field} variant='outlined'>
          <AutoComplete
            required
            onChange={(e, data) => {
              console.log(data)
              setValue('clientResidenceId', data?.id);
            }}
            className={classes.formControl}
            options={residences}
            defaultValue={client?.residence}
            getOptionLabel={option => option.name ?? ''}
            renderInput={params => (
              <TextField {...params} name='clientResidenceId' label='Residence' variant='outlined' />
            )}
          />
        </FormControl>
        <FormControl className={classes.field}>
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
        <FormControlLabel
          className={classes.field}
          labelPlacement='start'
          control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked={client.isActive} />}
          label='Active'
        />
        <div className={classes.btnGroup}>
          <Button onClick={() => setEditOpen({ open: false })} autoFocus>
            Cancel
          </Button>
          <Button type='submit' variant='outlined' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
