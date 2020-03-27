import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

export default function TextEntry({ field }) {
  const setRecord = useStoreActions(actions => actions.clientRecordModel.setEntry);
  const record = useStoreState(state => state.clientRecordModel.record);
  return (
    <div>
      <Paper elevation={3}>
        <TextField
          onChange={event => setRecord({ fieldId: field.fieldId, value: event.target.value })}
          label={field.label}
          multiline
          fullWidth
          rows='8'
          variant='outlined'
          value={record.entry[field.fieldId] || ''}
        />
      </Paper>
    </div>
  );
}
