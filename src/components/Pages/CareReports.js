import React, { useEffect, useState, useMemo } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listClientRecordsWithClient } from '../../graphql/customQueries';
import MUIDataTable from 'mui-datatables';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Grid, Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import Summary from './Summary';

export default function CareReports() {
  const records = useStoreState(state => state.clientRecordModel.records);
  const setRecords = useStoreActions(actions => actions.clientRecordModel.setRecords);
  const setSelectedRecord = useStoreActions(actions => actions.clientRecordModel.setSelectedRecord);
  useEffect(() => {
    const query = async () => {
      const ret = await API.graphql(graphqlOperation(listClientRecordsWithClient, { limit: 5000 }));
      setRecords(ret.data.listClientRecords.items);
      setSelectedRecord(ret.data.listClientRecords.items[0]);
    };
    query();
  }, []);

  const options = {
    filter: true,
    filterType: 'checkbox',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 100],
    onRowClick: (rowData, cellMeta) => setSelectedRecord(records[cellMeta.dataIndex])
  };
  const count = useMemo(() => {
    const emergencyCount = records.filter(rec => rec.entryType === 'emergency').length;
    const normalCount = records.filter(rec => rec.entryType === 'normal').length;
    const warningCount = records.filter(rec => rec.entryType === 'warning').length;
    return { emergency: emergencyCount, normal: normalCount, warning: warningCount };
  }, [records]);

  return (
    <Grid container spacing={1}>
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <MUIDataTable
          columns={[
            {
              name: 'client.name',
              label: 'Client Name',
              options: {
                customBodyRender: (value, tableMeta, updateValue) => value
              }
            },
            {
              name: 'date',
              label: 'Date',
              options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => new Date(value).toLocaleDateString()
              }
            },
            {
              name: 'shift',
              label: 'Shift',
              options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => value.toUpperCase()
              }
            },
            {
              name: 'entryType',
              label: 'Entry Type',
              options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => value || 'normal'
              }
            }
          ]}
          data={records}
          options={options}
          title='Client Records'
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <Paper elevation={3} style={{ minHeight: '100%' }}>
          <Bar height={400} data={dataBar(count)} options={barChartOptions} />
        </Paper>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Summary />
      </Grid>
    </Grid>
  );
}

const dataBar = ({ emergency, normal, warning }) => ({
  labels: ['Emergency', 'Normal', 'Warning'],
  datasets: [
    {
      label: 'Entries by Type',
      data: [emergency, normal, warning],
      backgroundColor: ['rgba(255, 134,159,0.4)', 'rgba(113, 205, 205,0.4)', 'rgba(255, 177, 101,0.4)'],
      borderWidth: 2,
      borderColor: ['rgba(255, 134, 159, 1)', 'rgba(113, 205, 205, 1)', 'rgba(255, 177, 101, 1)']
    }
  ]
});
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
