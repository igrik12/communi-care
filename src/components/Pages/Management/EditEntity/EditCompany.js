import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { useForm } from 'react-hook-form';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  title: {
    marginLeft: theme.spacing(1)
  }
}));

export default function EditCompany() {
  const [company, setCompany] = useState();
  const classes = useStyles();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const companies = useStoreState(state => state.companies);
  const updateCompany = useStoreActions(actions => actions.managementModel.updateCompany);
  const { register, handleSubmit } = useForm();

  const handleOnSubmit = data => {
    updateCompany(data);
  };

  useEffect(() => {
    const match = companies.find(company => company.id === editOpen.id);
    setCompany(match);
  }, [editOpen.id]);
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
      </form>
    </div>
  );
}
