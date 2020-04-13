import React from 'react';

import TopBar from './TopBar';
import Profile from './Profile';
import Table from './Table';

import Grid from '@material-ui/core/Grid';

export default function Clients() {
  return (
    <Grid container>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <TopBar />
      </Grid>
      <Grid item style={{ marginTop: '1rem' }} xl={12} lg={12} md={12} sm={12} xs={12}>
        <Grid container spacing={4}>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <Profile />
          </Grid>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <></>
      </Grid>
    </Grid>
  );
}
