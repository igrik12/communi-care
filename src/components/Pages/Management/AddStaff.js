import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

// Material-UI imports
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const AddStaff = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSignUpConfirm, setOpenSignUpConfirm] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [userType, setUserType] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    try {
      const success = await Auth.signUp({ username, password, attributes: { email, phone_number: number } });
      setOpenSignUpConfirm(true);
      console.log('Happened', success);
    } catch (error) {
      console.log('Error signing up!', error);
    }
    setOpen(false);
  };

  const handleChange = event => {
    setPermissions(event.target.value);
  };
  const handleTypeChange = event => {
    setUserType(event.target.value);
  };
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  function getStyles(name, permission, theme) {
    return {
      fontWeight:
        permission.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const mockPermissions = [
    { title: 'Edit Record Summary', value: 'editRecordSummary' },
    { title: 'Save Record Summary', value: 'saveRecordSummary' }
  ];

  const valid = username && username.length >= 6;

  const theme = useTheme();
  return (
    <div className={classes.root}>
      <Button onClick={handleClickOpen} color='primary' variant='outlined' fullWidth>
        Add Staff
      </Button>
      <Dialog maxWidth={'sm'} disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill in details</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!valid}
                  label='Username'
                  variant='outlined'
                  onChange={handleUsernameChange}
                  value={username}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!valid}
                  type='password'
                  label='Password'
                  variant='outlined'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!valid}
                  label='Phone number'
                  variant='outlined'
                  onChange={e => setNumber(e.target.value)}
                  value={number}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!valid}
                  type='email'
                  label='Email'
                  variant='outlined'
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id='user-type-label'>User Type</InputLabel>
                <Select labelId='user-type-label' id='user-type' value={userType} onChange={handleTypeChange}>
                  <MenuItem value={'user'}>User</MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id='permission-label'>Permissions</InputLabel>
                <Select
                  labelId='permission-label'
                  id='permission'
                  multiple
                  value={permissions}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {mockPermissions.map(permission => (
                    <MenuItem
                      key={permission.value}
                      value={permission.value}
                      style={getStyles(permission.title, permission.title, theme)}
                    >
                      {permission.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={!valid} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddStaff;
