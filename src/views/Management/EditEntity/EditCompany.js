import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { uploadPhoto } from 'utils/helpers';
import { PhotoPicker } from 'aws-amplify-react';
import { COMPANY } from 'utils/constants';
// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    minWidth: 300,
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  btnGroup: {
    margin: theme.spacing(1),
    marginLeft: 'auto',
  },
}));

export default function EditCompany() {
  const [company, setCompany] = useState();
  const classes = useStyles();
  const editOpen = useStoreState((state) => state.managementModel.editOpen);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const companies = useStoreState((state) => state.companies);
  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);
  const updateEntity = useStoreActions((actions) => actions.managementModel.updateEntity);

  const handleOnSubmit = async (data) => {
    const updateDetails = { id: company.id, ...data };
    updateEntity({ type: COMPANY, data: updateDetails });
    file && (await uploadPhoto(file, company.photoUrl));
    setEditOpen({ open: false });
  };

  const onPick = (data) => {
    setValue('photoUrl', data.file.name);
    setFile(data.file);
  };

  useEffect(() => {
    const match = companies.find((company) => company.id === editOpen.id);
    setCompany(match);
  }, [editOpen.id, companies]);
  if (_.isEmpty(company)) return null;

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <Box display='flex' justifyContent='space-between'>
          <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
            Edit
          </Typography>
          <FormControlLabel
            labelPlacement='start'
            control={<Switch inputRef={register} name='isActive' color='primary' defaultChecked={company.isActive} />}
            label='Active'
          />
        </Box>
        <FormControl className={classes.field} fullWidth>
          <TextField
            label='Company Name'
            inputRef={register({ required: true, minLength: 6 })}
            name='name'
            defaultValue={company.name}
          />
        </FormControl>
        <FormControl className={classes.field} fullWidth>
          <TextField
            inputRef={register}
            InputProps={{
              readOnly: true,
            }}
            label='Photo'
            name='photoUrl'
            variant='outlined'
            defaultValue={company.photoUrl ?? 'Not Available'}
          />
        </FormControl>
        <PhotoPicker preview onPick={onPick} />
        <div className={classes.btnGroup}>
          <Button onClick={() => setEditOpen({ open: false })}>Cancel</Button>
          <Button type='submit' variant='outlined' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
