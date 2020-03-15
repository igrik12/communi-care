import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';

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
  const addClient = useStoreActions(actions => actions.managementModel.addClient);
  const { register, handleSubmit, reset } = useForm();

  const onHandleSubmit = data => {
    addClient({ name: data.name });
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <Typography gutterBottom variant='h5' component='h2'>
          Client
        </Typography>

        <FormControl fullWidth className={classes.formControl}>
          <TextField
            required
            inputRef={register({ required: true })}
            label='Name'
            name='name'
            variant='outlined'
            fullWidth
            autoComplete='off'
          />
        </FormControl>

        <ButtonGroup fullWidth className={classes.buttonGroup}>
          <Button fullWidth color='primary'>
            Reset
          </Button>
          <Button type='submit' fullWidth color='primary'>
            Add
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default AddClient;
