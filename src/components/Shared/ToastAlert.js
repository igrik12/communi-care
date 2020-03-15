import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ToastAlert = () => {
  const alertOpen = useStoreState(state => state.alertOpen);
  const setAlertOpen = useStoreActions(actions => actions.setAlertOpen);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen({ open: false });
  };
  return (
    <Snackbar open={alertOpen.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertOpen.success ? 'success' : 'error'}>
        {alertOpen.message}
      </Alert>
    </Snackbar>
  );
};

function Alert(props) {
  return <MuiAlert elevation={3} variant='filled' {...props} />;
}

export default ToastAlert;
