import React from 'react';
import { useStoreActions } from 'easy-peasy';

// MUI imports
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ConfirmEntityDelete = ({ openDelete, setOpenDelete, entity }) => {
  const deleteEntity = useStoreActions((actions) => actions.managementModel.deleteEntity);

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

export default ConfirmEntityDelete;
