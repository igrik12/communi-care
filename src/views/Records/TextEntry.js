import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Controller } from 'react-hook-form';

export default function TextEntry({ field, control }) {
  return (
    <div>
      <Paper>
        <Controller
          as={<TextField label={field.label} multiline fullWidth rows='8' variant='outlined' />}
          name={field.fieldId}
          control={control}
          defaultValue={''}
        />
      </Paper>
    </div>
  );
}
