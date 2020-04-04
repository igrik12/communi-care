import React from 'react';
import 'date-fns';
import { useStoreActions } from 'easy-peasy';
import RecordMeta from './RecordMeta';
import _ from 'lodash';
import { useForm } from 'react-hook-form';

import TextEntries from './TextEntries';
import SaveConfirmDialog from './SaveConfirmDialog';

// MUI Imports
import Grid from '@material-ui/core/Grid';

export default function ClientRecord() {
  const { handleSubmit, reset, setValue, control, register, getValues, watch } = useForm();

  const createRecord = useStoreActions(actions => actions.clientRecordModel.createRecord);

  const onSubmit = entryType => {
    createRecord({ ...getValues(), entryType });
    reset();
  };

  const watching = watch();
  const result = _.isEmpty(watching) || _.some(_.values(watching), value => !value);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} direction='column'>
        <Grid item>
          <RecordMeta control={control} setValue={setValue} register={register} createdAt={watching.createdAt} />
        </Grid>
        <Grid item>
          <TextEntries control={control} />
        </Grid>
        <SaveConfirmDialog disable={result} onSubmitCallback={onSubmit} />
      </Grid>
    </form>
  );
}
