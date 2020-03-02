import React, { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listEntrysWithRecord, listClientRecords } from '../../graphql/queries';
import MaterialTable from 'material-table';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Grid } from '@material-ui/core';

export default function CareReports() {
  const entries = useStoreState(state => state.clientRecordModel.entries);
  const records = useStoreState(state => state.clientRecordModel.records);
  const setRecords = useStoreActions(actions => actions.clientRecordModel.setRecords);
  const setEntries = useStoreActions(actions => actions.clientRecordModel.setEntries);
  console.log(entries);
  useEffect(() => {
    const query = async () => {
      // Ret records and then modify table retrieval mechanism
      const ret = await API.graphql(graphqlOperation(listClientRecords));
      setRecords(ret.data.listClientRecords.items);

      const ret2 = await API.graphql(graphqlOperation(listEntrysWithRecord));
      console.log(ret2);
      setEntries(ret2.data.listEntrys.items);
    };
    query();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item lg={8} md={8}  sm={12} xs={12}>
        <MaterialTable
          columns={[
            {
              title: 'Client Name',
              render: rowData => rowData.clientRecord.client.name
            },
            {
              title: 'Date and Time',
              type: 'datetime',
              render: rowData => {
                return new Date(rowData.clientRecord.date).toLocaleString();
              }
            },
            {
              title: 'Shift',
              render: rowData => rowData.clientRecord.shift.toUpperCase()
            },
            {
              title: 'Entry Type',
              render: rowData => rowData.clientRecord.entryType
            }
          ]}
          data={entries}
          title='Client Report Entries'
        />
      </Grid>
      <Grid item lg={8} md={8} sm={12} xs={12}>
        
      </Grid>
    </Grid>
  );
}
