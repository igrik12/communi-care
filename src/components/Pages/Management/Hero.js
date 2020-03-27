import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import EditEntity from './EditEntity';
import { STAFF, COMPANY, CLIENT, RESIDENCE } from 'utils/constants';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

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
  },
  paper: {
    height: '100%'
  },
  logoText: {
    margin: theme.spacing(1),
    display: 'inline-block',
    width: 250,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  }
}));

export default function Hero() {
  const classes = useStyles();
  const staff = useStoreState(state => state.staff);
  const clients = useStoreState(state => state.clients);
  const companies = useStoreState(state => state.companies);
  const residences = useStoreState(state => state.residences);

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
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h5' component='h2' gutterBottom>
              Management
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={1}>
              <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                <Paper elevation={1} className={classes.paper}>
                  <TextField
                    onChange={onStaffChange(staff, setFilteredStaff)}
                    className={classes.titleRoot}
                    label='Search staff'
                  />
                  <StaffList staff={filteredStaff} />
                </Paper>
              </Grid>
              <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                <Paper elevation={1} className={classes.paper}>
                  <TextField
                    onChange={onClientChange(clients, setFilteredClients)}
                    className={classes.titleRoot}
                    label='Search client'
                  />
                  <ClientList clients={filteredClients} />
                </Paper>
              </Grid>
              <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
                <Paper elevation={1} className={classes.paper}>
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
                <Paper elevation={1} className={classes.paper}>
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <EditEntityDialog />
      </div>
    </>
  );
}

const ClientList = ({ clients }) => {
  const classes = useStyles();
  const [openDelete, setOpenDelete] = useState({ open: false, type: CLIENT, id: '' });
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  return (
    <>
      <List className={classes.list}>
        {clients.map((client, index) => {
          return (
            <ListItem
              onClick={() => setEditOpen({ open: true, type: CLIENT, id: client.id })}
              button
              key={client.id}
              alignItems='flex-start'
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={`${client.firstName} ${client.lastName}`}
                secondary={
                  <>
                    <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                      Active: {client.isActive ? 'Yes' : 'No'}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge='end' onClick={() => setOpenDelete({ open: true, type: CLIENT, id: client.id })}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={CLIENT} />
    </>
  );
};

const StaffList = ({ staff }) => {
  const classes = useStyles();
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  const [openDelete, setOpenDelete] = useState({ open: false, type: STAFF, id: '' });
  return (
    <>
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
                    Active: {st.isActive ? 'Yes' : 'No'}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge='end' onClick={() => setOpenDelete({ open: true, type: STAFF, id: st.id })}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={STAFF} />
    </>
  );
};

const ResidenceList = ({ residences }) => {
  const classes = useStyles();
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  const [openDelete, setOpenDelete] = useState({ open: false, type: RESIDENCE, id: '' });

  return (
    <>
      <List className={classes.list}>
        {residences.map((residence, index) => {
          return (
            <ListItem
              onClick={() => setEditOpen({ open: true, type: RESIDENCE, id: residence.id })}
              button
              key={residence.name + index}
              alignItems='flex-start'
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={residence.name} />
              <ListItemSecondaryAction>
                <IconButton edge='end' onClick={() => setOpenDelete({ open: true, type: RESIDENCE, id: residence.id })}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={RESIDENCE} />
    </>
  );
};

const CompanyList = ({ companies }) => {
  const classes = useStyles();
  const setEditOpen = useStoreActions(actions => actions.managementModel.setEditOpen);
  const [openDelete, setOpenDelete] = useState({ open: false, type: COMPANY, id: '' });
  return (
    <>
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
                  <Tooltip title={company.companyLogoUrl}>
                    <Typography
                      component='span'
                      variant='body2'
                      className={clsx(classes.inline, classes.logoText)}
                      color='textPrimary'
                    >
                      Company Logo URL: {company.companyLogoUrl}
                    </Typography>
                  </Tooltip>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge='end' onClick={() => setOpenDelete({ open: true, type: COMPANY, id: company.id })}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={COMPANY} />
    </>
  );
};

const ConfirmEntityDelete = ({ openDelete, setOpenDelete, entity }) => {
  const deleteEntity = useStoreActions(actions => actions.managementModel.deleteEntity);

  const handleClose = () => {
    setOpenDelete({ open: false });
  };
  const handleDelete = () => {
    deleteEntity({ type: entity, id: openDelete.id });
    setOpenDelete({ open: false });
  };
  return (
    <>
      <Dialog onClose={handleClose} open={openDelete.open}>
        <DialogTitle>Are you sure you want to delete {entity.toLowerCase()}?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            No
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
      <DialogContent>{editOpen.open && <EditEntity />}</DialogContent>
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

const onResidenceChange = (residence, setFilteredResidence) => event => {
  if (!event.target.value) {
    setFilteredResidence(residence);
  } else {
    setFilteredResidence(residence.filter(stf => stf.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }
};
