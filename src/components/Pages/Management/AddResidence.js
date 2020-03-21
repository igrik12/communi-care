import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { RESIDENCE } from 'utils/constants';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    marginTop: theme.spacing(1)
  },
  buttonGroup: {
    marginTop: theme.spacing(1)
  }
}));

export default function AddResidence() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const submitEntity = useStoreActions(actions => actions.managementModel.submitEntity);

  const onHandleSubmit = data => {
    const { name, firstLine, postCode, county } = data;
    const details = {
      name,
      address: {
        firstLine,
        postCode,
        county
      }
    };
    submitEntity({ type: RESIDENCE, data: details });
    reset();
  };

  return (
    <div>
      <Typography gutterBottom variant='h5' component='h2'>
        Residence
      </Typography>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
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
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                inputRef={register({ required: true })}
                label='First line'
                name='firstLine'
                variant='outlined'
                fullWidth
                autoComplete='off'
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                inputRef={register({ required: true })}
                label='County'
                name='county'
                variant='outlined'
                fullWidth
                autoComplete='off'
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                inputRef={register({ required: true })}
                label='Post Code'
                name='postCode'
                variant='outlined'
                fullWidth
                autoComplete='off'
              />
            </FormControl>
          </Grid>

          <ButtonGroup fullWidth className={classes.buttonGroup}>
            <Button fullWidth color='primary'>
              Reset
            </Button>
            <Button type='submit' fullWidth color='primary'>
              Add
            </Button>
          </ButtonGroup>
        </Grid>
      </form>
    </div>
  );
}
