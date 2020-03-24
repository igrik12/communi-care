import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { STAFF } from 'utils/constants';
import permissions from 'utils/permissions.json';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Button, Select, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/AutoComplete';

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
    margin: theme.spacing(1)
  },
  btnGroup: {
    margin: theme.spacing(1),
    marginLeft: 'auto'
  }
}));

export default function EditStaff() {
  const classes = useStyles();
  const [company, setCompany] = React.useState('');
  const [currentStaff, setCurrentStaff] = useState();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const staff = useStoreState(state => state.staff);
  const [allPermissions, setAllPermissions] = React.useState([]);
  const companies = useStoreState(state => state.companies);
  const updateEntity = useStoreActions(actions => actions.managementModel.updateEntity);
  const { register, handleSubmit, control, setValue } = useForm();
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);

  useEffect(() => {
    const match = staff.find(st => st.id === editOpen.id);
    setCurrentStaff(match);
    const companyMatch = companies.find(company => company.staff.items.some(item => item.id === match.id));
    setCompany(companyMatch);
  }, [editOpen.id, companies, staff]);

  useEffect(() => {
    if (currentStaff) {
      const common = _.intersectionWith(permissions, currentStaff.permissions, (a, b) => a.value === b);
      setValue('permissions', common);
      setAllPermissions(common);
    }
  }, [currentStaff, setValue, setAllPermissions]);

  const handleOnSubmit = data => {
    const updateDetails = { id: currentStaff.id, ...data };
    updateEntity({ type: STAFF, data: updateDetails });
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
            readOnly: true
          }}
        />
        <TextField
          label='Email'
          className={classes.field}
          inputRef={register({ required: true })}
          name='email'
          defaultValue={currentStaff.email}
          InputProps={{
            readOnly: true
          }}
        />
        <TextField
          label='Phone number'
          className={classes.field}
          inputRef={register({ required: true })}
          name='phone_number'
          defaultValue={currentStaff.phone_number}
          InputProps={{
            readOnly: true
          }}
        />
        <FormControl variant='outlined'>
          <Controller
            as={
              <Select className={classes.field}>
                {companies.map(company => {
                  return (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  );
                })}
              </Select>
            }
            name='staffCompanyId'
            control={control}
            defaultValue={company ? company.id : ''}
          />
        </FormControl>
        <FormControl variant='outlined'>
          <Controller
            as={
              <Select className={classes.field}>
                {['admin', 'developer', 'user'].map(type => {
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
        <FormControl variant='outlined'>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Autocomplete
              className={classes.textField}
              options={permissions}
              multiple
              disableCloseOnSelect
              onChange={(e, data) => {
                console.log(data);
                setValue('permissions', data);
                setAllPermissions(data);
              }}
              value={allPermissions}
              renderOption={option => <React.Fragment>{option.title}</React.Fragment>}
              getOptionLabel={option => option.title}
              renderInput={params => <TextField {...params} name='permissions' label='Permission' variant='outlined' />}
            />
          </Grid>
        </FormControl>
        <div className={classes.btnGroup}>
          <Button onClick={() => setEditOpen({ open: false })} autoFocus>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
