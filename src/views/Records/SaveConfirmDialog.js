import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Save from '@material-ui/icons/Save';

const options = ['normal', 'warning', 'emergency'];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      onEntering={handleEntering}
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
    >
      <DialogTitle id='confirm-save-type'>Save the record?</DialogTitle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label='ringtone' name='ringtone' value={value} onChange={handleChange}>
          {options.map(option => (
            <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOk} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: '5%',
    right: '3%'
  },
  paper: {
    width: '80%',
    maxHeight: 435
  }
}));

export default function ConfirmationDialog({ onSubmitCallback, disable }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('normal');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = newValue => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
      onSubmitCallback(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <Fab disabled={disable} variant='round' color='primary' onClick={handleClick}>
        <Save />
      </Fab>
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper
        }}
        id='ringtone-menu'
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </div>
  );
}
