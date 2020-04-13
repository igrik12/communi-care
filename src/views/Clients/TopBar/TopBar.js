import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextAvatar from './TextAvatar';
import TextIcon from './TextIcon';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const usePhoto = (photoUrl) => {
  const [photo, setPhoto] = useState();
  useEffect(() => {
    const fetchImages = async () => {
      const img = await Storage.get(photoUrl);
      setPhoto(img);
    };
    fetchImages();
  }, [photoUrl]);

  return photo;
};

export default function TopBar({ clients, selectedClient, selectClient }) {
  const classes = useStyles();
  const photo = usePhoto(selectedClient?.photoUrl);
  return (
    <Box display='flex' alignItems='center'>
      <Box p={1} flexGrow={1}>
        <FormControl className={classes.formControl} variant='outlined'>
          <InputLabel id='client-lable'>Client</InputLabel>
          <Select labelId='client-lable' value={selectedClient?.id} onChange={selectClient}>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>{`${client.firstName} ${client.lastName}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box flexGrow={3} p={1}>
        <TextAvatar text={`${selectedClient?.firstName} ${selectedClient?.lastName}`} avatarUrl={photo} />
      </Box>
      <Box p={1} flexGrow={1}>
        <TextIcon
          text={selectedClient?.isActive ? 'Active' : 'Inactive'}
          color={selectedClient?.isActive ? 'primary' : 'secondary'}
        />
      </Box>
    </Box>
  );
}
