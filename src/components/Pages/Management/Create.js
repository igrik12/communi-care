import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  selectFormControl: {
    margin: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Create() {
  const classes = useStyles();
  const [createType, setCreateType] = React.useState('new');

  const handleChange = event => {
    setCreateType(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <FormControl component='fieldset' className={classes.selectFormControl}>
            <FormLabel component='legend'>Select company option</FormLabel>
            <RadioGroup
              style={{ display: 'inline' }}
              aria-label='company-create'
              name='company-create'
              value={createType}
              onChange={handleChange}
            >
              <FormControlLabel value='new' control={<Radio color='primary' />} label='New' />
              <FormControlLabel value='select' control={<Radio color='primary' />} label='Select' />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <CompanyEditType type={createType} />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <AddStaff />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <AddClient />
        </Grid>
      </Grid>
    </div>
  );
}

const CompanyEditType = ({ type }) => {
  return (
    <div>
      {type === 'new' ? (
        <TextField id='create-new' label='Name' variant='outlined' />
      ) : (
        <CompanySelect
          options={[
            { title: 'Company X', value: 'companyX' },
            { title: 'Company Y', value: 'companyY' }
          ]}
        />
      )}
    </div>
  );
};

const CompanySelect = ({ options }) => {
  const classes = useStyles();
  const [company, setCompany] = React.useState('');
  const handleChange = event => {
    setCompany(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='company-select-label'>Company</InputLabel>
      <Select id='company-select' value={company} onChange={handleChange}>
        {options &&
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const useStaffStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const AddStaff = () => {
  const classes = useStaffStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setPermission(event.target.value);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [permission, setPermission] = React.useState([]);

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];

  const persmission = [
    { title: 'Edit Record Summary', value: 'editRecordSummary' },
    { title: 'Save Record Summary', value: 'saveRecordSummary' }
  ];

  const [type, setType] = React.useState('user');
  const [userName, setUsername] = React.useState('');
  const handleTypeChange = event => {
    setType(event.target.value);
  };
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const valid = userName && userName.length >= 6;

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
                  value={userName}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id='user-type-label'>User Type</InputLabel>
                <Select labelId='user-type-label' id='user-type' value={type} onChange={handleTypeChange}>
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
                  value={permission}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {persmission.map(permission => (
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
          <Button onClick={handleClose} disabled={!valid} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const AddClient = () => {
  const classes = useStaffStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = event => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleClickOpen} color='primary' variant='outlined' fullWidth>
        Add Client
      </Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='demo-dialog-native'>Age</InputLabel>
                <Select native value={age} onChange={handleChange} input={<Input id='demo-dialog-native' />}>
                  <option value='' />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-dialog-select-label'>Age</InputLabel>
                <Select
                  labelId='demo-dialog-select-label'
                  id='demo-dialog-select'
                  value={age}
                  onChange={handleChange}
                  input={<Input />}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
