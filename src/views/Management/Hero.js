import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  list: {
    width: '100%',
    maxHeight: 200,
    overflow: 'auto',
  },
  inline: {
    display: 'inline',
  },
  title: {
    marginLeft: theme.spacing(2),
  },
  listContent: {
    display: 'block',
    flexDirection: 'column',
  },
  listItem: {
    width: '100%',
  },
  titleRoot: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  paper: {
    height: '100%',
    padding: 5,
  },
  avatar: { color: '#fff', background: '#9187F2' },
  itemText: { color: '#9187F2' },
  logoText: {
    margin: theme.spacing(1),
    display: 'inline-block',
    width: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  },
}));

export default function Hero() {
  const classes = useStyles();
  const staff = useStoreState((state) => state.staff);
  const clients = useStoreState((state) => state.clients);
  const companies = useStoreState((state) => state.companies);
  const residences = useStoreState((state) => state.residences);

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [filteredResidences, setFilteredResidences] = useState([]);

  useEffect(() => {
    setFilteredCompanies(companies);
    setFilteredStaff(staff);
    setFilteredClients(clients);
    setFilteredResidences(residences);
  }, [companies, clients, staff, residences]);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <TextField
                onChange={onStaffChange(staff, setFilteredStaff)}
                className={classes.titleRoot}
                label='Search staff'
              />
              <StaffList staff={filteredStaff} />
            </Paper>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <TextField
                onChange={onClientChange(clients, setFilteredClients)}
                className={classes.titleRoot}
                label='Search client'
              />
              <ClientList clients={filteredClients} />
            </Paper>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <TextField
                onChange={onCompanyChange(companies, setFilteredCompanies)}
                className={classes.titleRoot}
                label='Search company'
                autoComplete='off'
              />
              <CompanyList companies={filteredCompanies} />
            </Paper>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <Paper className={classes.paper}>
              <TextField
                onChange={onResidenceChange(residences, setFilteredResidences)}
                className={classes.titleRoot}
                label='Search residence'
                autoComplete='off'
              />
              <ResidenceList residences={filteredResidences} />
            </Paper>
          </Grid>
        </Grid>
        <EditEntityDialog />
      </div>
    </>
  );
}

const onClientChange = (clients, setFilteredClients) => (event) => {
  if (!event.target.value) {
    setFilteredClients(clients);
  } else {
    setFilteredClients(
      clients.filter((client) => client.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  }
};




