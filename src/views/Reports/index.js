import React, { useEffect, useMemo } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { API, graphqlOperation } from 'aws-amplify';
import { listClientRecords } from 'graphql/customQueries';
import { generateChartsData } from 'utils/helpers';
import ChartistGraph from 'react-chartist';
import _ from 'lodash';
import { addYears } from 'date-fns';
import { clientRecordUpdateSubscribe } from 'utils/modelHelpers/records';

// MUI components
import MUIDataTable from 'mui-datatables';
import Summary from './Summary';

// @material-ui/core
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import AccessTime from '@material-ui/icons/AccessTime';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

// view components
import ConfirmUpdate from './ConfirmUpdate';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const convertRecords = (records) => {
  return records.map((record) => ({
    ...record,
    fullName: `${record?.client?.firstName?.trim() || 'unknown'} ${record?.client?.lastName?.trim() || 'unknown'}`,
    staffName: `${record?.staff?.firstName?.trim() || 'unknown'} ${record?.staff?.lastName?.trim() || 'unknown'}`,
  }));
};

const groupAll = (data) => {
  let innerRes = {};
  _.forEach(data, (value, key) => {
    const groupped = _.reduce(
      value,
      function (result, item) {
        const date = new Date(item.createdAt);
        if (addYears(date, 1) < Date.now()) return;
        const month = monthNames[date.getMonth()];
        var year = ('' + date.getFullYear()).slice(-2);
        var group = month + "'" + year;
        result[group] = result[group] ? ++result[group] : 1;
        return result;
      },
      {}
    );
    innerRes[key] = groupped;
  });
  return innerRes;
};

const sortByDate = (data) => {
  return data.sort(function compare(a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
};

const query = async (setRecords, setSelectedRecord) => {
  const ret = await API.graphql(graphqlOperation(listClientRecords, { limit: 5000 }));
  setRecords(sortByDate(ret.data.listClientRecords.items));
  setSelectedRecord(ret.data.listClientRecords.items[0]);
};

function CareReports() {
  const records = useStoreState((state) => state.clientRecordModel.records);
  const setRecords = useStoreActions((actions) => actions.clientRecordModel.setRecords);
  const setSelectedRecord = useStoreActions((actions) => actions.clientRecordModel.setSelectedRecord);
  const mergeWindow = useStoreState((state) => state.clientRecordModel.mergeWindow);
  const classes = useStyles();

  useEffect(() => {
    query(setRecords, setSelectedRecord);
    const sub = clientRecordUpdateSubscribe(() => query(setRecords, setSelectedRecord));
    return () => {
      sub.unsubscribe();
    };
  }, [setRecords, setSelectedRecord]);

  const converted = convertRecords(records);

  const options = {
    filter: true,
    responsive: 'scrollMaxHeight',
    filterType: 'checkbox',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 100],
    onRowClick: (rowData, cellMeta) => setSelectedRecord(records[cellMeta.dataIndex]),
  };

  // Memoize expensive computation of grouped values.
  // This groups all records by type and produces charts data with labels
  // being as date, and values as count of entry types for that particular date.
  const data = useMemo(() => {
    const groupedByType = _.groupBy(records, 'entryType');
    const grouped = groupAll(groupedByType);
    const emergency = generateChartsData(_.get(grouped, 'emergency'));
    const warning = generateChartsData(_.get(grouped, 'warning'));
    const normal = generateChartsData(_.get(grouped, 'normal'));
    return { emergency, warning, normal };
  }, [records]);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color='success'>
              <ChartistGraph
                className='ct-chart'
                data={data?.normal?.data}
                type='Line'
                options={data?.normal?.options}
                listener={data?.normal?.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Normal Records</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated at {new Date().toLocaleTimeString()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color='warning'>
              <ChartistGraph
                className='ct-chart'
                data={data?.warning?.data}
                type='Line'
                options={data?.warning?.options}
                listener={data?.warning?.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Warning Records</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated at {new Date().toLocaleTimeString()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color='danger'>
              <ChartistGraph
                className='ct-chart'
                data={data?.emergency?.data}
                type='Line'
                options={data?.emergency?.options}
                listener={data?.emergency?.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Emergency Records</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated at {new Date().toLocaleTimeString()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <MUIDataTable
            columns={[
              {
                name: 'fullName',
                label: 'Client Name',
              },
              {
                name: 'createdAt',
                label: 'Date',
                options: {
                  filter: true,
                  sort: true,
                  customBodyRender: (value) => new Date(value).toLocaleString(),
                },
              },
              {
                name: 'shift',
                label: 'Shift',
                options: {
                  filter: true,
                  sort: true,
                  customBodyRender: (value) => value.toUpperCase(),
                },
              },
              {
                name: 'entryType',
                label: 'Entry Type',
                options: {
                  filter: true,
                  sort: true,
                  customBodyRender: (value) => value || 'normal',
                },
              },
              {
                name: 'staffName',
                label: 'Staff ',
              },
            ]}
            data={converted}
            options={options}
            title='Record Entries'
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Summary />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {mergeWindow.open && (
            <ConfirmUpdate mergeData={mergeWindow.mergeData} originalData={mergeWindow.originalData} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default CareReports;
