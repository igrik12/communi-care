import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { uploadPhoto } from 'utils/helpers';
import { PhotoPicker } from 'aws-amplify-react';
import { RESIDENCE } from 'utils/constants';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    flexGrow: 1,
    margin: theme.spacing(1),
    minWidth: 300,
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  buttonGroup: {
    marginTop: theme.spacing(1),
    marginLeft: 'auto',
  },
}));

export default function EditResidence() {
  const classes = useStyles();
  const [residence, setResidence] = useState();
  const editOpen = useStoreState((state) => state.managementModel.editOpen);
  const residences = useStoreState((state) => state.residences);
  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);
  const updateEntity = useStoreActions((actions) => actions.managementModel.updateEntity);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const handleOnSubmit = async (data) => {
    console.log(data)
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
    const updateDetails = { id: residence.id, ...details };
    updateEntity({ type: RESIDENCE, data: updateDetails });
    file && (await uploadPhoto(file, residence.photoUrl));
    setEditOpen({ open: false });
  };
  useEffect(() => {
    const match = residences.find((residence) => residence.id === editOpen.id);
    setResidence(match);
  }, [editOpen.id, residences]);

  const onPick = (data) => {
    setValue('photoUrl', data.file.name);
    setFile(data.file);
  };

  if (_.isEmpty(residence)) return null;

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <Box display='flex' justifyContent='space-between'>
          <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
            Edit
          </Typography>
          <FormControlLabel
            labelPlacement='start'
            control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked={residence.isActive} />}
            label='Active'
          />
        </Box>
        <TextField
          className={classes.field}
          label='Residence Name'
          inputRef={register({ required: true, minLength: 6 })}
          name='name'
          defaultValue={residence.name}
        />
        <TextField
          className={classes.field}
          label='First line'
          inputRef={register({ required: true })}
          name='firstLine'
          defaultValue={residence?.address?.firstLine}
        />
        <TextField
          className={classes.field}
          label='County'
          inputRef={register({ required: true })}
          name='county'
          defaultValue={residence?.address?.county}
        />
        <TextField
          className={classes.field}
          label='Post Code'
          inputRef={register({ required: true })}
          name='postCode'
          defaultValue={residence?.address?.postCode}
        />
        <FormControl fullWidth>
          <TextField
            className={classes.field}
            inputRef={register}
            InputProps={{
              readOnly: true,
            }}
            label='Photo'
            name='photoUrl'
            variant='outlined'
            defaultValue={residence.photoUrl ?? 'Not Available'}
          />
        </FormControl>
        <PhotoPicker preview onPick={onPick} />
        <div className={classes.buttonGroup}>
          <Button onClick={() => setEditOpen({ open: false })}>Cancel</Button>
          <Button variant='outlined' type='submit' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
