import React, { useState } from 'react';
import { PhotoPicker } from 'aws-amplify-react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default function AddPhotoDialog({ onPick, open, setOpen }) {
  const [file, setFile] = useState();
  const handleClose = () => {
    onPick(file);
    setOpen(false);
  };
  const onCancel = () => {
    setOpen(false);
  };
  const onLocalPick = (data) => {
    setFile(data);
  };
  return (
    <Dialog aria-labelledby='addphoto-dialog-title' open={open}>
      <DialogTitle id='addphoto-dialog-title'>{'Select a photo to add'}</DialogTitle>
      <DialogContent>
        <PhotoPicker preview onPick={onLocalPick} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='primary'>
          Cancel
        </Button>
        <Button variant='outlined' onClick={handleClose} color='primary'>
          Add photo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
