import React, { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listEntrysWithRecord, listClientRecords } from '../../graphql/queries';
import MaterialTable from 'material-table';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Grid, Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

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
      <Grid item lg={8} md={8} sm={12} xs={12}>
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
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Paper style={{height:'100%'}}>
          <Bar data={dataBar} options={barChartOptions} />
        </Paper>
      </Grid>
    </Grid>
  );
}

const dataBar = {
  labels: ['Emergency', 'Normal', 'Warning'],
  datasets: [
    {
      label: 'Entries by Type',
      data: [12, 19, 3],
      backgroundColor: ['rgba(255, 134,159,0.4)', 'rgba(113, 205, 205,0.4)', 'rgba(255, 177, 101,0.4)'],
      borderWidth: 2,
      borderColor: ['rgba(255, 134, 159, 1)', 'rgba(113, 205, 205, 1)', 'rgba(255, 177, 101, 1)']
    }
  ]
};
const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        barPercentage: 1,
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
