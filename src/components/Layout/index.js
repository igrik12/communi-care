import React from 'react';
import { Auth } from 'aws-amplify';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import ToastAlert from '../Shared/ToastAlert';
import _ from 'lodash';
import { hasPermissions } from 'utils/permissions';

// MUI imports
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Avatar } from '@material-ui/core';
import UserIcon from '@material-ui/icons/SupervisedUserCircle';

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    title: {
      flexGrow: 1
    },
    background: '#716CE2'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { container, children } = props;
  const user = useStoreState(state => state.user);
  const companyData = useStoreState(state => state.companyData);
  const setThemeColor = useStoreActions(actions => actions.layoutModel.setThemeColor);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <ListItem>
        <ListItemIcon>
          <Avatar src={companyData?.company?.companyLogoUrl} />
        </ListItemIcon>
        <Typography variant={'h6'}>{companyData?.company?.name ?? 'No Company'}</Typography>
      </ListItem>
      <Divider />
      <List>
        {[
          { title: 'Records', value: '/record', authorised: () => hasPermissions(user, 'recordsPage') },
          { title: 'Reports', value: '/reports', authorised: () => hasPermissions(user, 'reportsPage') },
          { title: 'Clients', value: '/clients', authorised: () => hasPermissions(user, 'clientsPage') },
          { title: 'Management', value: '/management', authorised: () => hasPermissions(user, 'managementPage') }
        ].map((item, index) => {
          return (
            item.authorised() && (
              <ListItem component={Link} to={item.value} button key={item.title}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            )
          );
        })}
      </List>
      <Divider />
      <List>
        {['Support', 'About'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <ToastAlert />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h5' noWrap>
            @Communi-Care
          </Typography>

          <ButtonGroup style={{ marginLeft: 'auto' }} variant='text' color='primary'>
            <Button disableRipple startIcon={<UserIcon />} color='inherit'>
              {Auth.user.username}
            </Button>
            <Button onClick={setThemeColor} color='inherit'>
              Theme
            </Button>
            <Button onClick={() => Auth.signOut()} color='inherit'>
              Logout
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  container: PropTypes.any
};

export default ResponsiveDrawer;
