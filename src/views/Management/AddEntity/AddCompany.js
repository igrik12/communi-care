import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm, ErrorMessage } from 'react-hook-form';
import { COMPANY } from 'utils/constants';
import _ from 'lodash';

import AddPhotoDialog from './AddPhotoDialog';

// Matertial-UI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { ButtonGroup, FormControl, Box } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Business from '@material-ui/icons/Business';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    marginTop: theme.spacing(1),
  },
  buttonGroup: {
    marginTop: theme.spacing(1),
  },
}));

export default function AddCompany() {
  const companies = useStoreState((state) => state.companies);
  const submitEntity = useStoreActions((actions) => actions.managementModel.submitEntity);
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, reset, errors } = useForm();

  const onPick = (data) => {
    setValue('photoUrl', data.file.name);
    setFile(data.file);
  };

  const onSubmitHandle = (data) => {
    if (_.isEmpty(errors)) {
      submitEntity({ type: COMPANY, data });
      reset();
    }
  };
  const validateCompany = (value) => {
    return !companies.some((company) => company.name.toLowerCase().includes(value.toLowerCase()))
      ? undefined
      : `${value} company exists!`;
  };
  return (
    <Box display='flex' flexDirection='column'>
      <Box style={{ padding: '0 10px' }} display='flex' justifyContent='space-between'>
        <Typography gutterBottom variant='h5' component='h2'>
          Add Company
        </Typography>
        <Avatar src={file && URL.createObjectURL(file)} />
      </Box>
      <Box m={1}>
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  required
                  inputRef={register({ required: true, validate: validateCompany })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Business />
                      </InputAdornment>
                    ),
                  }}
                  variant='outlined'
                  name='name'
                  label='Company Name'
                  autoComplete='off'
                />
                <ErrorMessage style={{ color: 'red' }} errors={errors} name='name' as='p' />
              </FormControl>
            </Grid>
            <Grid style={{ margin: '5px 0' }} item lg={12} md={12} sm={12} xs={12}>
              <Box display='flex' alignItems='center'>
                <Button
                  onClick={() => setOpen(true)}
                  variant='outlined'
                  color='primary'
                  startIcon={<PhotoCamera />}
                >
                  Upload photo
                </Button>
                <FormControlLabel
                  style={{ marginLeft: 'auto' }}
                  labelPlacement='start'
                  control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked />}
                  label='Active'
                />
              </Box>
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
        <AddPhotoDialog open={open} setOpen={setOpen} onPick={onPick} />
      </Box>
    </Box>
  );
}
