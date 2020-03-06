import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

export default function TextEntry({ field }) {
  const setRecord = useStoreActions(actions => actions.clientRecordModel.setEntry);
  const record = useStoreState(state => state.clientRecordModel.record);
  return (
    <div>
      <Paper elevation={6}>
        <TextField
          onChange={event => setRecord({ fieldId: field.fieldId, value: event.target.value })}
          id='outlined-multiline-static'
          label={field.label}
          multiline
          fullWidth
          rows='6'
          variant='outlined'
          value={record.entry[field.fieldId] || ''}
        />
      </Paper>
    </div>
  );
}
