import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Save from '@material-ui/icons/Save';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const useStyle = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: '5%',
    right: '3%'
  }
}));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function FloatingButton({ props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyle();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const saveRecord = useStoreActions(actions => actions.clientRecordModel.saveRecord);
  return (
    <div className={classes.root}>
      <Fab variant='round' color='primary' onClick={handleClick}>
        <Save />
      </Fab>
      <StyledMenu id='customized-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem
          onClick={() => {
            saveRecord();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Save style={{ color: 'lightGreen' }} />
          </ListItemIcon>
          <ListItemText primary='Normal' />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Save color='error' />
          </ListItemIcon>
          <ListItemText primary='Warning' />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <Save color='secondary' />
          </ListItemIcon>
          <ListItemText primary='Emergency' />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
