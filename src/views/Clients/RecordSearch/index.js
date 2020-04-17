import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getClientRecords } from 'graphql/customQueries';
import { useStoreState, useStoreActions } from 'easy-peasy';
import DateFnsUtils from '@date-io/date-fns';
import { startOfToday, endOfDay } from 'date-fns';
// @MUI imports
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
// Core components
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    marginTop: theme.spacing(1),
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function RecordSearch() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const selectedClient = useStoreState((state) => state.clientsModel.selectedClient);
  const setSelectedRecord = useStoreActions((actions) => actions.clientRecordModel.setSelectedRecord);
  const [from, setFrom] = useState(startOfToday());
  const [to, setTo] = useState(endOfDay(new Date()));
  const [records, setRecords] = useState([]);
  const handleFromDateChange = (date) => {
    new Date().toLocaleDateString();
    setFrom(date);
  };

  const handleToDateChange = (date) => {
    setTo(date);
  };

  const handleSelect = (data, value) => {
    setSelectedRecord(value);
  };

  const handleSearch = async () => {
    setLoading(true);
    await sleep(500);
    const details = { id: selectedClient.id, from: from, to: to };
    try {
      const records = await API.graphql(graphqlOperation(getClientRecords, details));
      setRecords(records.data.getClient.clientRecords.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setSelectedRecord(null);
    return () => {
      setSelectedRecord(null);
    };
  }, [setSelectedRecord]);

  return (
    <Card>
      <CardHeader color='rose'>
        <h4 className={classes.cardTitleWhite}>Search Records</h4>
        <p className={classes.cardCategoryWhite}>Search from date range of records</p>
      </CardHeader>
      <CardBody>
        <Grid container spacing={3} alignItems='center' justify='flex-end'>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <FormControl fullWidth className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  required
                  onChange={handleFromDateChange}
                  inputVariant='outlined'
                  label='From'
                  format='MM/dd/yyyy'
                  value={from}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <FormControl fullWidth className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  required
                  onChange={handleToDateChange}
                  inputVariant='outlined'
                  label='To'
                  format='MM/dd/yyyy'
                  value={to}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Autocomplete
              options={records}
              loading={loading}
              onChange={handleSelect}
              getOptionLabel={(option) => new Date(option.createdAt).toLocaleString()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Records'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color='inherit' size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </CardBody>
      <Divider variant='middle' />
      <CardFooter>
        <Button onClick={handleSearch} style={{ marginTop: 10 }} fullWidth variant='outlined' color='primary'>
          Search
        </Button>
      </CardFooter>
    </Card>
  );
}
