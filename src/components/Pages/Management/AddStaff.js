import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { ButtonGroup } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  const { register, handleSubmit } = useForm();
  const [] = useState([]);
  const mockPermissions = [
    { title: 'Edit Record Summary', value: 'editRecordSummary' },
    { title: 'Save Record Summary', value: 'saveRecordSummary' }
  ];
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register({ required: true, minLength: 5 })}
          className={classes.textField}
          name='username'
          label='Username'
          variant='outlined'
        />
        <TextField
          inputRef={register({ required: true })}
          className={classes.textField}
          name='password'
          type='password'
          label='Password'
          variant='outlined'
        />
        <TextField
          inputRef={register({ required: true })}
          className={classes.textField}
          name='phone_number'
          label='Phone number'
          variant='outlined'
        />
        <TextField
          inputRef={register({ required: true })}
          className={classes.textField}
          name='email'
          type='email'
          label='Email'
          variant='outlined'
        />
        <Autocomplete
          className={classes.textField}
          options={['user', 'admin']}
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
        <Autocomplete
          className={classes.textField}
          options={mockPermissions}
          multiple
          disableCloseOnSelect
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.title}
            </React.Fragment>
          )}
          getOptionLabel={option => option.title}
          renderInput={params => (
            <TextField
              {...params}
              inputRef={register({ required: true })}
              name='permission'
              label='Permission'
              variant='outlined'
            />
          )}
        />
        <ButtonGroup fullWidth className={classes.buttonGroup}>
          <Button color='primary'>Reset</Button>
          <Button type='submit' color='primary'>
            Add
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default AddStaff;
