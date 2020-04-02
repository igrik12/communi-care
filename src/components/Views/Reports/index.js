import React, { useEffect, useMemo } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listClientRecordsWithClient } from './node_modules/graphql/customQueries';
import MUIDataTable from 'mui-datatables';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Grid, Paper, withWidth } from '@material-ui/core';
import { Bar, Line } from 'react-chartjs-2';
import Summary from './Summary';

const convertRecords = records => {
  return records.map(record => ({
    ...record,
    fullName: `${record?.client?.firstName?.trim() || 'unknown'} ${record?.client?.lastName?.trim() || 'unknown'}`
  }));
};

function CareReports() {
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
  }, [setRecords, setSelectedRecord]);

  const converted = convertRecords(records);

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
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <MUIDataTable
          columns={[
            {
              name: 'fullName',
              label: 'Client Name'
            },
            {
              name: 'createdAt',
              label: 'Date',
              options: {
                filter: true,
                sort: true,
                customBodyRender: value => new Date(value).toLocaleDateString()
              }
            },
            {
              name: 'shift',
              label: 'Shift',
              options: {
                filter: true,
                sort: true,
                customBodyRender: value => value.toUpperCase()
              }
            },
            {
              name: 'entryType',
              label: 'Entry Type',
              options: {
                filter: true,
                sort: true,
                customBodyRender: value => value || 'normal'
              }
            }
          ]}
          data={converted}
          options={options}
          title='Client Records'
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Summary />
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <Paper elevation={3} style={{ minHeight: '100%' }}>
          <Bar height={200} data={dataBar(count)} options={barChartOptions} />
        </Paper>
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <Paper elevation={3} style={{ minHeight: '100%' }}>
          <Line height={200} data={lineData} />
        </Paper>
      </Grid>
    </Grid>
  );
}
var s1 = {
  label: 's1',
  borderColor: 'blue',
  data: [
    { x: '2017-01-06 18:39:30', y: 100 },
    { x: '2017-01-07 18:39:28', y: 101 }
  ]
};

var s2 = {
  label: 's2',
  borderColor: 'red',
  data: [
    { x: '2017-01-07 18:00:00', y: 90 },
    { x: '2017-01-08 18:00:00', y: 105 }
  ]
};

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [s1, s2],
  options: {
    scales: {
      xAxes: [
        {
          type: 'date'
        }
      ]
    }
  }
};
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

export default withWidth()(CareReports);
