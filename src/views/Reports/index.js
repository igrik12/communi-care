import React, { useEffect, useMemo } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listClientRecordsWithClient } from 'graphql/customQueries';
import MUIDataTable from 'mui-datatables';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Grid, withWidth } from '@material-ui/core';
import ChartistGraph from 'react-chartist';
import Summary from './Summary';
import Chartist from 'chartist';
import _ from 'lodash';

// @material-ui/core
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

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);
var delays = 80,
  durations = 500;

const generateChartsData = typeData => {
  const innerLabels = [];
  const innerSeries = [];
  typeData.forEach(datum => {
    innerLabels.push(datum.createdAt);
    innerSeries.push(datum.count);
  });

  const returnValue = {
    data: {
      labels: innerLabels,
      series: [innerSeries]
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 20,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    animation: {
      draw: function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
        }
      }
    }
  };
  return returnValue;
};

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

  const classes = useStyles();

  useEffect(() => {
    const sortByDate = data => {
      return data.sort(function compare(a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    };
    const query = async () => {
      const ret = await API.graphql(graphqlOperation(listClientRecordsWithClient, { limit: 5000 }));
      const sortedByDate = sortByDate(ret.data.listClientRecords.items);
      _.forEach(sortedByDate, item => {
        item.createdAt = new Date(item.createdAt).toDateString();
      });
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

  // Memoize expensive computation of grouped values.
  // This groups all records by type and produces charts data with labels
  // being as date, and values as count of entry types for that particular date.
  const data = useMemo(() => {
    const createChartData = (value, key) => {
      const groupedByCreatedAt = _.groupBy(value, 'createdAt');
      const final = {
        eventType: key,
        data: _.map(groupedByCreatedAt, (innerValue, innerKey) => ({ createdAt: innerKey, count: innerValue.length }))
      };
      return final;
    };

    const groupedByType = _.groupBy(records, 'entryType');
    const mapped = _.map(groupedByType, createChartData);
    const emergency = generateChartsData(mapped.find(type => type.eventType === 'emergency')?.data || []);
    const warning = generateChartsData(mapped.find(type => type.eventType === 'warning')?.data || []);
    const normal = generateChartsData(mapped.find(type => type.eventType === 'normal')?.data || []);
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
                label: 'Client Name'
              },
              {
                name: 'createdAt',
                label: 'Date',
                options: {
                  filter: true,
                  sort: true,
                  customBodyRender: value => value
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
            title='Record Entries'
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Summary />
        </Grid>
      </Grid>
    </>
  );
}

export default withWidth()(CareReports);
