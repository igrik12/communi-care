import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import EditEntity from './EditEntity';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteButton from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { STAFF, COMPANY, CLIENT } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  list: {
    width: '100%',
    maxHeight: 250,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  title: {
    marginLeft: theme.spacing(2)
  },
  listContent: {
    display: 'block',
    flexDirection: 'column'
  },
  listItem: {
    width: '100%'
  },
  titleRoot: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  }
}));

export default function Hero() {
  const classes = useStyles();
  const staff = useStoreState(state => state.staff);
  const clients = useStoreState(state => state.clients);
  const companies = useStoreState(state => state.companies);

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    setFilteredCompanies(companies);
    setFilteredStaff(staff);
    setFilteredClients(clients);
  }, [companies, clients, staff]);

  return (
    <>
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h5' component='h2' gutterBottom>
                Management
              </Typography>
              <Typography variant='body2' component='p' color='textSecondary'>
                This page is for company, staff and client management, that allows a user to create new entities and
                manage their permissions.
              </Typography>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={1}>
              <Grid item lg={4} xl={4} md={6} sm={12} xs={12}>
                <TextField
                  onChange={onStaffChange(staff, setFilteredStaff)}
                  className={classes.titleRoot}
                  label='Search staff'
                />
                <StaffList staff={filteredStaff} />
              </Grid>
              <Grid item lg={4} xl={4} md={6} sm={12} xs={12}>
                <TextField
                  onChange={onClientChange(clients, setFilteredClients)}
                  className={classes.titleRoot}
                  label='Search client'
                />
                <ClientList clients={filteredClients} />
              </Grid>
              <Grid item lg={4} xl={4} md={6} sm={12} xs={12}>
                <TextField
                  onChange={onCompanyChange(companies, setFilteredCompanies)}
                  className={classes.titleRoot}
                  label='Search company'
                  autoComplete='off'
                />
                <CompanyList companies={filteredCompanies} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <EditEntityDialog />
      </div>
    </>
  );
}

const ClientList = ({ clients }) => {
  const classes = useStyles();
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  return (
    <List className={classes.list}>
      {clients.map((client, index) => {
        return (
          <ListItem
            onClick={() => setEditOpen({ open: true, type: CLIENT, id: client.id })}
            button
            key={client.name + index}
            alignItems='flex-start'
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={client.name} />
          </ListItem>
        );
      })}
    </List>
  );
};

const StaffList = ({ staff }) => {
  const classes = useStyles();
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  return (
    <List className={classes.list}>
      {staff.map((st, index) => {
        return (
          <ListItem
            onClick={() => setEditOpen({ open: true, type: STAFF, id: st.id })}
            button
            key={st.username + index}
            alignItems='flex-start'
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={st.username}
              secondary={
                <>
                  <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                    Email: {st.email}
                  </Typography>
                  <br />
                  Phone Number: {st.phone_number}
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const CompanyList = ({ companies }) => {
  const classes = useStyles();
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  const deleteCompany = useStoreActions(actions => actions.managementModel.deleteCompany);
  return (
    <List className={classes.list}>
      {companies.map((company, index) => {
        return (
          <ListItem
            onClick={() => setEditOpen({ open: true, type: COMPANY, id: company.id })}
            button
            key={company.name + index}
            alignItems='flex-start'
          >
            <ListItemAvatar>
              <Avatar src={company.companyLogoUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={company.name}
              secondary={
                <>
                  <Typography component='span' variant='body2' className={classes.inline} color='textSecondary'>
                    Company Logo URL: {company.companyLogoUrl}
                  </Typography>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

const EditEntityDialog = () => {
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  const handleClose = () => {
    setEditOpen({ open: false, type: '', id: '' });
  };
  return (
    <Dialog open={editOpen.open} onClose={handleClose}>
      <DialogTitle>{''}</DialogTitle>
      <DialogContent>{editOpen.open && <EditEntity />}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Disagree
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const onCompanyChange = (companies, setFilteredCompanies) => event => {
  if (!event.target.value) {
    setFilteredCompanies(companies);
  } else {
    setFilteredCompanies(
      companies.filter(company => company.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  }
};

const onClientChange = (clients, setFilteredClients) => event => {
  if (!event.target.value) {
    setFilteredClients(clients);
  } else {
    setFilteredClients(clients.filter(client => client.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }
};

const onStaffChange = (staff, setFilteredStaff) => event => {
  if (!event.target.value) {
    setFilteredStaff(staff);
  } else {
    setFilteredStaff(staff.filter(stf => stf.username.toLowerCase().includes(event.target.value.toLowerCase())));
  }
};
