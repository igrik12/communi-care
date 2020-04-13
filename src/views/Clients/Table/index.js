import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useForm, Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MUIDataTable from 'mui-datatables';

import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
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

export default function MyTable() {
  const classes = useStyles();
  const handleFromDateChange = (date) => {};

  const handleToDateChange = (date) => {};

  const data = [0, 1, 2, 3, 4].map((i) => ({ date: new Date(), shift: 'am', entryType: 'normal', staffName: 'Bobby' }));

  return (
    <Card>
      <CardHeader color='rose'>
        <h4 className={classes.cardTitleWhite}>Search Records</h4>
        <p className={classes.cardCategoryWhite}>Search from date range of records</p>
      </CardHeader>
      <CardBody>
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
        <Card plain>
          <CardBody>
            <Table
              tableHeaderColor='primary'
              tableHead={['ID', 'Name', 'Country', 'City', 'Salary']}
              tableData={[
                ['1', 'Dakota Rice', '$36,738', 'Niger', 'Oud-Turnhout'],
                ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
                ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux'],
                ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park'],
                ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten'],
                ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester'],
              ]}
            />
          </CardBody>
        </Card>
      </CardBody>
    </Card>
    // <Grid container flexDirection='column' spacing={1}>
    //   <Grid item lg={12} md={12} sm={12} xs={12}>
    //     <Grid container spacing={1} alignItems='center' justify='space-between'>
    //       <Grid item lg={5} md={5} sm={5} xs={5}>
    //         <FormControl fullWidth className={classes.formControl}>
    //           <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //             <KeyboardDatePicker
    //               required
    //               onChange={handleFromDateChange}
    //               inputVariant='outlined'
    //               label='From'
    //               format='MM/dd/yyyy'
    //               value={null}
    //             />
    //           </MuiPickersUtilsProvider>
    //         </FormControl>
    //       </Grid>
    //       <Grid item lg={5} md={5} sm={5} xs={5}>
    //         <FormControl fullWidth className={classes.formControl}>
    //           <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //             <KeyboardDatePicker
    //               required
    //               onChange={handleToDateChange}
    //               inputVariant='outlined'
    //               label='To'
    //               format='MM/dd/yyyy'
    //               value={null}
    //             />
    //           </MuiPickersUtilsProvider>
    //         </FormControl>
    //       </Grid>
    //       <Grid item lg={2} md={2} sm={2} xs={2}>
    //         <IconButton color='primary'>
    //           <SearchIcon />
    //         </IconButton>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid item lg={12} md={12} sm={12} xs={12}>
    //     <MUIDataTable
    //       columns={[
    //         {
    //           name: 'createdAt',
    //           label: 'Date',
    //           options: {
    //             filter: true,
    //             sort: true,
    //             customBodyRender: (value) => new Date(value).toLocaleString(),
    //           },
    //         },
    //         {
    //           name: 'shift',
    //           label: 'Shift',
    //           options: {
    //             filter: true,
    //             sort: true,
    //             customBodyRender: (value) => value.toUpperCase(),
    //           },
    //         },
    //         {
    //           name: 'entryType',
    //           label: 'Entry Type',
    //           options: {
    //             filter: true,
    //             sort: true,
    //             customBodyRender: (value) => value || 'normal',
    //           },
    //         },
    //         {
    //           name: 'staffName',
    //           label: 'Staff ',
    //         },
    //       ]}
    //       data={data}
    //       options={options}
    //       title='Client Records'
    //     />
    //   </Grid>
    // </Grid>
  );
}
