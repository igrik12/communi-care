import React from 'react';
import { Storage } from 'aws-amplify';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextAvatar from './TextAvatar';
import TextIcon from './TextIcon';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
}));

export default function TopBar({ clients, selectedClient, selectClient }) {
  const classes = useStyles();

  
  React.useEffect(() => {
    const fetchImages = async () => {
      const file = await Storage.get('avataaars.png');
      console.log(file);
    };
    fetchImages();
  }, []);

  const handleOnChange = (e) => {
    const image = e.target.files[0];

  };
  return (
    <Box display='flex' alignItems='center'>
      <Box p={1} flexGrow={1} className={classes.field}>
        <Autocomplete
          required
          options={clients}
          onChange={(event, client) => {
            selectClient(client);
          }}
          defaultValue={clients[0]}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          getOptionSelected={(option) => option}
          renderInput={(params) => <TextField {...params} label='Client' variant='outlined' />}
        />
      </Box>
      <Box flexGrow={3} p={1}>
        <TextAvatar
          text={`${selectedClient?.firstName} ${selectedClient?.lastName}`}
          // avatarUrl={selectedClient?.photoUrl}
        />
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
