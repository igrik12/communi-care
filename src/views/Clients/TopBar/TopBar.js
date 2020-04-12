import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  field: {
    minWidth: 200,
  },
}));

export default function TopBar({ clients, selectedClient, selectClient }) {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='space-between' p={1} m={1}>
      <Box p={1} className={classes.field}>
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
      <Box p={1} bgcolor='grey.300'>
        Item 1
      </Box>
      <Box p={1} bgcolor='grey.300'>
        Item 1
      </Box>
    </Box>
  );
}
