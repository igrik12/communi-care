import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

export default function TextEntry({ field, register }) {
  return (
    <div>
      <Paper elevation={3}>
        <TextField
          name={field.fieldId}
          label={field.label}
          multiline
          fullWidth
          inputRef={register}
          rows='8'
          variant='outlined'
        />
      </Paper>
    </div>
  );
}
