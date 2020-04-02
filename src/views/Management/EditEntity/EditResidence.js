import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { RESIDENCE } from 'utils/constants';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: { marginTop: theme.spacing(1) },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    flexGrow: 1,
    margin: theme.spacing(1),
    minWidth: 300
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  buttonGroup: {
    marginTop: theme.spacing(1),
    marginLeft: 'auto'
  }
}));

export default function EditResidence() {
  const classes = useStyles();
  const [residence, setResidence] = useState();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const residences = useStoreState(state => state.residences);
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  const updateEntity = useStoreActions(actions => actions.managementModel.updateEntity);
  const { register, handleSubmit } = useForm();

  const handleOnSubmit = data => {
    const { name, firstLine, postCode, county } = data;
    const details = {
      name,
      address: {
        firstLine,
        postCode,
        county
      }
    };
    const updateDetails = { id: residence.id, ...details };
    updateEntity({ type: RESIDENCE, data: updateDetails });
    setEditOpen({ open: false });
  };
  useEffect(() => {
    const match = residences.find(residence => residence.id === editOpen.id);
    setResidence(match);
  }, [editOpen.id, residences]);

  if (_.isEmpty(residence)) return null;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
        Edit
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
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
        <div className={classes.buttonGroup}>
          <Button onClick={() => setEditOpen({ open: false })} autoFocus>
            Cancel
          </Button>
          <Button variant='outlined' type='submit' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
