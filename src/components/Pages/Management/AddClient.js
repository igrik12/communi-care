import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const AddClient = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const addClient = useStoreActions(actions => actions.managementModel.addClient);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClient = () => {
    addClient({ name });
    setOpen(false);
    setName('');
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!name}
                  label='Name'
                  variant='outlined'
                  onChange={handleNameChange}
                  value={name}
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAddClient} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddClient;
