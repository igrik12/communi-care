import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Selection() {
  const editModeOn = useStoreState(state => state.managementModel.editModeOn);
  const setEditModeOn = useStoreActions(actions => actions.managementModel.setEditModeOn);

  const handleChange = event => {
    setEditModeOn(!editModeOn);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={editModeOn} onChange={handleChange} value={editModeOn} color='primary' />}
        label={editModeOn ? 'Edit' : 'Create'}
      />
    </FormGroup>
  );
}