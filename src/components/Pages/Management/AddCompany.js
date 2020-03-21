import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm, ErrorMessage } from 'react-hook-form';
import { COMPANY } from 'utils/constants';
import _ from 'lodash';

// Matertial-UI imports
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ButtonGroup, FormControl } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    marginTop: theme.spacing(1)
  },
  buttonGroup: {
    marginTop: theme.spacing(1)
  }
}));

const filter = createFilterOptions();

const findCompany = (companies, inputCompany) => {
  if (!inputCompany || !companies || !companies.length) return [];
  return companies.find(company => company.name === inputCompany.name);
};

export default function AddCompany() {
  const companies = useStoreState(state => state.companies);
  const submitEntity = useStoreActions(actions => actions.managementModel.submitEntity);
  const classes = useStyles();
  const [active, setActive] = React.useState(true);
  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmitHandle = data => {
    if (_.isEmpty(errors)) {
      submitEntity({ type: COMPANY, data });
      reset();
    }
  };
  const validateCompany = value => {
    return !companies.some(company => company.name.toLowerCase().includes(value.toLowerCase()))
      ? undefined
      : `${value} company exists!`;
  };
  console.log(errors);
  return (
    <>
      <Typography gutterBottom variant='h5' component='h2'>
        Company
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                inputRef={register({ required: true, validate: validateCompany })}
                variant='outlined'
                name='name'
                label='Company Name'
                autoComplete='off'
              />
              <ErrorMessage style={{ color: 'red' }} errors={errors} name='name' as='p' />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                required
                variant='outlined'
                name='companyLogoUrl'
                inputRef={register({ required: true })}
                label='Logo URL'
                autoComplete='off'
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControlLabel
              labelPlacement='start'
              control={
                <Switch
                  className={classes.formField}
                  inputRef={register}
                  checked={active}
                  onChange={event => setActive(event.target.checked)}
                  name='isActive'
                  color='primary'
                />
              }
              label='Active'
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ButtonGroup fullWidth className={classes.buttonGroup}>
              <Button color='primary'>Reset</Button>
              <Button type='submit' color='primary'>
                Add
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
