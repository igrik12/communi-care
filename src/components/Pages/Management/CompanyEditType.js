import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';

// Matertial-UI imports
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const filter = createFilterOptions();

export default function CompanyEditType() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const onSubmit = data => console.log(data);
  const companies = useStoreState(state => state.managementModel.companies);

  const handleClose = () => {
    setDialogValue({
      name: '',
      url: ''
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    url: ''
  });

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
                url: ''
              });
            });
            return;
          }

          if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
              url: ''
            });

            return;
          }

          setValue(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`
            });
          }

          return filtered;
        }}
        id='free-solo-dialog-demo'
        options={companies}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={option => option.name}
        freeSolo
        renderInput={params => <TextField name='company-name' {...params} label='Company name' variant='outlined' />}
      />
      <AddNewCompany open={open} handleClose={handleClose} />
    </>
  );
}

const AddNewCompany = ({ open, handleClose }) => {
  const { register, handleSubmit, errors } = useForm();
  const setCompany = useStoreActions(actions => actions.managementModel.setCompany);
  const onSubmit = data => {
    setCompany(data);
    handleClose(true);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id='form-dialog-title'>Add a new film</DialogTitle>
        <DialogContent>
          <DialogContentText>Did you miss any film in our list? Please, add it!</DialogContentText>
          <TextField autoFocus margin='dense' name='name' inputRef={register} label='Company Name' type='text' />
          <TextField margin='dense' name='companyLogoUrl' inputRef={register} label='Logo URL' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
