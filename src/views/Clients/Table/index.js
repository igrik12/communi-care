import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm, Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MUIDataTable from 'mui-datatables';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(1) },
  formControl: {
    marginTop: theme.spacing(1),
  },
}));

const options = {
  filter: false,
  print: false,
  download: false,
  responsive: 'scrollMaxHeight',
  filterType: 'checkbox',
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 100],
};

export default function Table() {
  const classes = useStyles();
  const handleFromDateChange = (date) => {};

  const handleToDateChange = (date) => {};

  const data = [0, 1, 2, 3, 4].map((i) => ({ date: new Date(), shift: 'am', entryType: 'normal', staffName: 'Bobby' }));

  return (
    <Grid container flexDirection='column' spacing={1}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Grid container spacing={1} alignItems='center' justify='space-between'>
          <Grid item lg={5} md={5} sm={5} xs={5}>
            <FormControl fullWidth className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  onChange={handleFromDateChange}
                  inputVariant='outlined'
                  label='From'
                  format='MM/dd/yyyy'
                  value={null}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item lg={5} md={5} sm={5} xs={5}>
            <FormControl fullWidth className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  onChange={handleToDateChange}
                  inputVariant='outlined'
                  label='To'
                  format='MM/dd/yyyy'
                  value={null}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item lg={2} md={2} sm={2} xs={2}>
            <IconButton color='primary'>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <MUIDataTable
          columns={[
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
          data={data}
          options={options}
          title='Client Records'
        />
      </Grid>
    </Grid>
  );
}
