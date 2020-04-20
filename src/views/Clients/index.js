import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { clientRecordUpdateSubscribe } from 'utils/modelHelpers/records';

import TopBar from './TopBar';
import Profile from './Profile';
import RecordSearch from './RecordSearch';
import Summary from 'views/Reports/Summary';

import Grid from '@material-ui/core/Grid';

export default function Clients() {
  const setSelectedRecord = useStoreActions((actions) => actions.clientRecordModel.setSelectedRecord);
  const user = useStoreState((state) => state.user);

  useEffect(() => {
    clientRecordUpdateSubscribe((updated) => {
      if (updated.updatedBy === user.id) {
        console.log('Calling');
        setSelectedRecord(updated);
      }
    });
  }, [setSelectedRecord, user]);

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
            <RecordSearch />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Summary />
      </Grid>
    </Grid>
  );
}
