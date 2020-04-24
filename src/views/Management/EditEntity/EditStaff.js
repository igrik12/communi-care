import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { STAFF } from 'utils/constants';
import permissions from 'utils/permissions.json';
import { uploadPhoto } from 'utils/helpers';
import { PhotoPicker } from 'aws-amplify-react';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Button, Select, Grid, FormControlLabel, Switch } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
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
    maxWidth: 500,
  },
  btnGroup: {
    margin: theme.spacing(1),
    marginLeft: 'auto',
  },
}));

export default function EditStaff() {
  const classes = useStyles();
  const [currentStaff, setCurrentStaff] = useState();
  const [file, setFile] = useState(null);
  const editOpen = useStoreState((state) => state.managementModel.editOpen);
  const staff = useStoreState((state) => state.staff);
  const [allPermissions, setAllPermissions] = React.useState([]);
  const companies = useStoreState((state) => state.companies);
  const updateEntity = useStoreActions((actions) => actions.managementModel.updateEntity);
  const { register, handleSubmit, control, setValue } = useForm();
  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);

  const onPick = (data) => {
    setValue('photoUrl', data.file.name);
    setFile(data.file);
  };

  useEffect(() => {
    const match = staff.find((st) => st.id === editOpen.id);
    setCurrentStaff(match);
  }, [editOpen.id, companies, staff]);

  useEffect(() => {
    register({ name: 'staffCompanyId', required: true });
    register({ name: 'dateOfBirth', required: true });
  }, [register, setValue]);

  useEffect(() => {
    if (currentStaff) {
      const common = _.intersectionWith(permissions, currentStaff.permissions, (a, b) => a.value === b);
      setAllPermissions(common);
    }
  }, [currentStaff, setValue, setAllPermissions]);

  const handleOnSubmit = async (data) => {
    const updateDetails = {
      id: currentStaff.id,
      permissions: allPermissions.map((perm) => perm.value),
      ...data,
    };
    updateEntity({ type: STAFF, data: updateDetails });

    await uploadPhoto(file, currentStaff.photoUrl);
    setEditOpen({ open: false });
  };

  if (_.isEmpty(currentStaff)) return null;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
        EDIT
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <TextField
          label='Username'
          className={classes.field}
          inputRef={register({ required: true, minLength: 6 })}
          name='username'
          defaultValue={currentStaff.username}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label='Email'
          className={classes.field}
          inputRef={register({ required: true })}
          name='email'
          defaultValue={currentStaff.email}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label='Phone number'
          className={classes.field}
          inputRef={register({ required: true })}
          name='phone_number'
          defaultValue={currentStaff.phone_number}
          InputProps={{
            readOnly: true,
          }}
        />
        <FormControl className={classes.field} variant='outlined'>
          <Autocomplete
            required
            onChange={(e, data) => {
              setValue('staffCompanyId', data?.id);
            }}
            className={classes.formControl}
            options={companies}
            defaultValue={currentStaff?.company}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option) => option}
            renderInput={(params) => <TextField {...params} label='Company' variant='outlined' />}
          />
        </FormControl>
        <FormControl variant='outlined'>
          <Controller
            as={
              <Select className={classes.field}>
                {['admin', 'developer', 'user'].map((type) => {
                  return (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  );
                })}
              </Select>
            }
            name='userType'
            control={control}
            defaultValue={currentStaff.userType}
          />
        </FormControl>
        <FormControl className={classes.field} variant='outlined'>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Autocomplete
              options={permissions}
              multiple
              disableCloseOnSelect
              onChange={(e, data) => {
                setAllPermissions(data);
              }}
              value={allPermissions}
              renderOption={(option) => <React.Fragment>{option.title}</React.Fragment>}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label='Permission' variant='outlined' />}
            />
          </Grid>
        </FormControl>
        <FormControlLabel
          className={classes.field}
          labelPlacement='start'
          control={
            <Switch inputRef={register} name='isActive' color='primary' defaultChecked={currentStaff.isActive} />
          }
          label='Active'
        />
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
            defaultValue={currentStaff.photoUrl ?? 'Not Available'}
          />
        </FormControl>
        <PhotoPicker preview onPick={onPick} />
        <div className={classes.btnGroup}>
          <Button onClick={() => setEditOpen({ open: false })}>Cancel</Button>
          <Button type='submit' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
