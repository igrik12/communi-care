import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { COMPANY } from 'utils/constants';
// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  btnGroup: {
    margin: theme.spacing(1),
    marginLeft: 'auto'
  }
}));

export default function EditCompany() {
  const [company, setCompany] = useState();
  const classes = useStyles();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const companies = useStoreState(state => state.companies);
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  const updateEntity = useStoreActions(actions => actions.managementModel.updateEntity);
  const { register, handleSubmit } = useForm();

  const handleOnSubmit = data => {
    const updateDetails = { id: company.id, ...data };
    updateEntity({ type: COMPANY, data: updateDetails });
    setEditOpen({ open: false });
  };

  useEffect(() => {
    const match = companies.find(company => company.id === editOpen.id);
    setCompany(match);
  }, [editOpen.id, companies]);
  if (_.isEmpty(company)) return null;

  return (
    <div className={classes.root}>
      <Typography className={classes.title} gutterBottom variant='h5' component='h2'>
        Edit
      </Typography>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <TextField
          label='Company Name'
          inputRef={register({ required: true, minLength: 6 })}
          name='name'
          defaultValue={company.name}
        />
        <TextField
          label='Company Logo Url'
          inputRef={register({ required: true })}
          name='companyLogoUrl'
          defaultValue={company.companyLogoUrl}
        />
        <div className={classes.btnGroup}>
          <Button onClick={() => setEditOpen({ open: false })} autoFocus>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
