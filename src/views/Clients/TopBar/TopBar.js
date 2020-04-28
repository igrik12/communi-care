import React from 'react';
import { usePhoto } from 'utils/customHooks';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextAvatar from './TextAvatar';
import TextIcon from './TextIcon';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
  },
}));

export default function TopBar({ clients, selectedClient, selectClient }) {
  const { photoUrl, id, firstName, lastName } = selectedClient;
  const classes = useStyles();

  const photo = usePhoto(id, photoUrl);

  return (
    <Grid container alignItems='center'>
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel id='client-lable'>Client</InputLabel>
          <Select label='Client' labelId='client-lable' value={id} onChange={selectClient}>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>{`${client.firstName} ${client.lastName}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
        <TextAvatar text={`${firstName} ${lastName}`} avatarUrl={photo} />
      </Grid>
      <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
        <TextIcon
          text={selectedClient?.isActive ? 'Active' : 'Inactive'}
          color={selectedClient?.isActive ? 'primary' : 'secondary'}
        />
      </Grid>
    </Grid>
  );
}
