import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { RESIDENCE } from 'utils/constants';

import AddPhotoDialog from './AddPhotoDialog';

import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MarkunreadMailbox from '@material-ui/icons/MarkunreadMailbox';
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

export default function AddResidence() {
  const classes = useStyles();
  const { register, handleSubmit, setValue, reset } = useForm();
  const submitEntity = useStoreActions((actions) => actions.managementModel.submitEntity);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const onPick = (data) => {
    setValue('photoUrl', data.file.name);
    setFile(data.file);
  };

  const onHandleSubmit = (data) => {
    const { name, firstLine, postCode, county, isActive, photoUrl } = data;
    const details = {
      name,
      isActive,
      photoUrl,
      address: {
        firstLine,
        postCode,
        county,
      },
    };
    submitEntity({ type: RESIDENCE, data: details });
    reset();
  };

  return (
    <Box display='flex' flexDirection='column'>
      <Box style={{ padding: '0 10px' }} display='flex' justifyContent='space-between'>
        <Typography gutterBottom variant='h5' component='h2'>
          Add Residence
        </Typography>
        <Avatar src={file && URL.createObjectURL(file)} />
      </Box>
      <Box m={1}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Grid container spacing={1}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <FormControl fullWidth className={classes.formControl}>
                <TextField
                  required
                  inputRef={register({ required: true })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Home />
                      </InputAdornment>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Home />
                      </InputAdornment>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MarkunreadMailbox />
                      </InputAdornment>
                    ),
                  }}
                  label='Post Code'
                  name='postCode'
                  variant='outlined'
                  fullWidth
                  autoComplete='off'
                />
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
        <AddPhotoDialog open={open} setOpen={setOpen} onPick={onPick} />
      </Box>
    </Box>
  );
}
