import React from 'react';
import classNames from 'classnames';
import { Auth } from 'aws-amplify';
import { usePhoto } from 'utils/customHooks';
import { useStore, useStoreState } from 'easy-peasy';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const store = useStore();
  const user = useStoreState((state) => state.user);

  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleLogout = ({ dispatch }) => {
    dispatch.reset();
    Auth.signOut();
    setOpenProfile(null);
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const photo = usePhoto(user.photoUrl);

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup='true'
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Avatar style={{ marginRight: 5 }} src={photo}></Avatar>
          <Hidden mdDown implementation='css'>
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
          </Hidden>
          <Hidden mdUp implementation='css'>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={classNames({ [classes.popperClose]: !openProfile }) + ' ' + classes.popperNav}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id='profile-menu-list-grow'
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role='menu'>
                    <MenuItem onClick={handleCloseProfile} className={classes.dropdownItem}>
                      Profile
                    </MenuItem>
                    <Divider light />
                    <MenuItem onClick={() => handleLogout(store)} className={classes.dropdownItem}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
