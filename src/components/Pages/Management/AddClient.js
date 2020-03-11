import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
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
  const [name, setName] = useState('');
  const addClient = useStoreActions(actions => actions.managementModel.addClient);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  return (
    <div>
      <form>
        <Typography gutterBottom variant='h6' component='h2'>
          Client
        </Typography>

        <FormControl fullWidth className={classes.formControl}>
          <TextField label='Name' variant='outlined' onChange={handleNameChange} value={name} fullWidth />
        </FormControl>

        <ButtonGroup fullWidth className={classes.buttonGroup}>
          <Button fullWidth color='primary'>
            Reset
          </Button>
          <Button fullWidth color='primary'>
            Add
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default AddClient;
