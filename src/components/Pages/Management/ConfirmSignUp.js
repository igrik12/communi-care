import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ConfirmSignUp() {
  return (
    <div className={classes.root}>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  error={!name}
                  label='Name'
                  variant='outlined'
                  onChange={handleNameChange}
                  value={name}
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleAddClient} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
