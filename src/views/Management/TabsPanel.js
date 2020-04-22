import React from 'react';
import PropTypes from 'prop-types';
import { useStoreState } from 'easy-peasy';
import AddCompany from './AddEntity/AddCompany';
import AddResidence from './AddEntity/AddResidence';
import AddStaff from './AddEntity/AddStaff';
import AddClient from './AddEntity/AddClient';
import CompanyList from './EntityLists/CompanyList';
import StaffList from './EntityLists/StaffList';
import ClientList from './EntityLists/ClientList';
import ResidenceList from './EntityLists/ResidenceList';
import EditEntityDialog from './EditEntity/EditEntityDialog';

// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CompanyIcon from '@material-ui/icons/BusinessCenter';
import ResidenceIcon from '@material-ui/icons/Business';
import StaffIcon from '@material-ui/icons/SupervisorAccount';
import ClientIcon from '@material-ui/icons/People';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
  };
}

export default function TabsPanel() {
  const [value, setValue] = React.useState(0);
  const companies = useStoreState((state) => state.companies);
  const residences = useStoreState((state) => state.residences);
  const staff = useStoreState((state) => state.staff);
  const clients = useStoreState((state) => state.clients);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar color='primary' position='static'>
        <Tabs value={value} onChange={handleChange} variant='fullWidth'>
          <Tab icon={<CompanyIcon />} label='Company' {...a11yProps(0)} />
          <Tab icon={<ResidenceIcon />} label='Residence' {...a11yProps(1)} />
          <Tab icon={<StaffIcon />} label='Staff' {...a11yProps(2)} />
          <Tab icon={<ClientIcon />} label='Client' {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={1}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <AddCompany />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <CompanyList companies={companies} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={1}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <AddResidence />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <ResidenceList residences={residences} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={1}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <AddStaff />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <StaffList staff={staff} />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container spacing={1}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <AddClient />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <ClientList clients={clients} />
          </Grid>
        </Grid>
      </TabPanel>
      <EditEntityDialog />
    </div>
  );
}
