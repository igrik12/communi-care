import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { CLIENT } from 'utils/constants';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import _ from 'lodash';
import { uploadPhoto } from 'utils/helpers';
import { PhotoPicker } from 'aws-amplify-react';

//MUI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
  },
  input: {
    display: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  field: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  btnGroup: {
    margin: theme.spacing(1),
    marginLeft: 'auto',
  },
}));

export default function EditClient() {
  const [client, setClient] = useState();
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [file, setFile] = useState(null);

  const { register, handleSubmit, setValue } = useForm();
  const updateEntity = useStoreActions((actions) => actions.managementModel.updateEntity);
  const classes = useStyles();

  const editOpen = useStoreState((state) => state.managementModel.editOpen);
  const clients = useStoreState((state) => state.clients);
  const companies = useStoreState((state) => state.companies);
  const residences = useStoreState((state) => state.residences);
  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);

  const handleOnSubmit = async (data) => {
    const updateDetails = { id: client.id, dateOfBirth, ...data };
    updateEntity({ type: CLIENT, data: updateDetails });
    await uploadPhoto(file, client.photoUrl);
    setEditOpen({ open: false });
  };

  const handleDateChange = (date) => {
    setValue('dateOfBirth', date);
    setDateOfBirth(date);
  };

  const onPick = (data) => {
    setValue('photoUrl', data.file.name);
    setFile(data.file);
  };

  useEffect(() => {
    register({ name: 'clientCompanyId', required: true });
    register({ name: 'clientResidenceId', required: true });
    register({ name: 'dateOfBirth', required: true });
  }, [register, setValue]);

  useEffect(() => {
    const match = clients.find((client) => client.id === editOpen.id);
    setClient(match);
  }, [editOpen.id, clients, companies]);

  useEffect(() => {
    setDateOfBirth(client?.dateOfBirth);
  }, [client, setDateOfBirth]);

  if (_.isEmpty(client)) return null;

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <Box display='flex' justifyContent='space-between' alignItems='center' className={classes.title}>
          <Typography gutterBottom variant='h5' component='h2'>
            EDIT
          </Typography>
          <FormControlLabel
            className={classes.field}
            labelPlacement='start'
            control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked={client.isActive} />}
            label='Active'
          />
        </Box>
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
          <Autocomplete
            required
            onChange={(e, data) => {
              setValue('clientCompanyId', data?.id);
            }}
            options={companies}
            defaultValue={client?.company}
            getOptionLabel={(option) => option.name ?? ''}
            getOptionSelected={(option) => option}
            renderInput={(params) => <TextField {...params} label='Company' variant='outlined' />}
          />
        </FormControl>
        <FormControl className={classes.field} variant='outlined'>
          <Autocomplete
            required
            onChange={(e, data) => {
              setValue('clientResidenceId', data?.id);
            }}
            options={residences}
            defaultValue={client?.residence}
            getOptionLabel={(option) => option.name ?? ''}
            getOptionSelected={(option) => option}
            renderInput={(params) => <TextField {...params} label='Residence' variant='outlined' />}
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
        <FormControl fullWidth>
          <TextField
            className={classes.field}
            inputRef={register}
            InputProps={{
              readOnly: true,
            }}
            label='Photo'
            name='photoUrl'
            variant='outlined'
            defaultValue={client?.photoUrl ?? 'Not Available'}
          />
        </FormControl>
        <PhotoPicker preview onPick={onPick} />
        <div className={classes.btnGroup}>
          <Button onClick={() => setEditOpen({ open: false })}>Cancel</Button>
          <Button type='submit' variant='outlined' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
