import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import EditEntity from '.';

import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

const EditEntityDialog = () => {
  const editOpen = useStoreState((state) => state.managementModel.editOpen);
  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);
  const handleClose = () => {
    setEditOpen({ open: false, type: '', id: '' });
  };
  return (
    <Dialog open={editOpen.open} onClose={handleClose}>
      <DialogContent>{editOpen.open && <EditEntity />}</DialogContent>
    </Dialog>
  );
};

export default EditEntityDialog;
