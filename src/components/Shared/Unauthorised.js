import React from 'react';
import { Typography, Box } from '@material-ui/core';

export default function Unauthorised() {
  return (
    <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 40 }}>
      <Typography variant='h4'>You don't have any permissions. Please contact administrator</Typography>
    </Box>
  );
}
