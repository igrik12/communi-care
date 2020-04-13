import React, { useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { hasPermissions } from 'utils/helpers';
import { textFields } from '../Records/TextEntries';

// MUI Imports
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Button, Box, Paper, Switch, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    textAlign: 'center',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(18),
    textAlign: 'center',
  },
  details: {
    alignItems: 'center',
  },
  textField: { width: '100%' },
  summaryBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  column: {
    flexBasis: '33.33%',
    marginLeft: 10,
  },
  saveBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
  },
}));

const fields = textFields.map((field) => field.fieldId);

const toUpperKey = (key) =>
  key
    .replace(/^\w/, (c) => c.toUpperCase())
    .split(/(?=[A-Z])/)
    .join(' ');

export default function Summary() {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const user = useStoreState((state) => state.user);
  const selectedRecord = useStoreState((state) => state.clientRecordModel.selectedRecord);
  const updateRecord = useStoreActions((actions) => actions.clientRecordModel.updateRecord);
  const hasPerm = hasPermissions(user, 'editRecordSummary');
  const { register, handleSubmit, setValue } = useForm();

  const onSumbit = (data) => {
    updateRecord({
      ...data,
      id: selectedRecord.id,
      expectedVersion: selectedRecord.version,
      createdAt: new Date(),
      clientRecordStaffId: user.id,
    });
    setEditMode(false);
  };

  const handleChange = (event) => {
    setEditMode(event.target.checked);
  };

  const filtered = _.pick(selectedRecord, fields);

  useEffect(() => {
    _.forIn(filtered, (value, key) => {
      setValue(key, value);
    });
  }, [filtered, setValue]);

  const MemoizedFields = useMemo(
    () =>
      _.map(filtered, (value, key) => (
        <Grid key={key} item lg={4} md={4} sm={6} xs={12}>
          <TextField
            name={key}
            className={classes.textField}
            disabled={!hasPerm || !editMode}
            inputRef={register}
            label={toUpperKey(key)}
            multiline
            rows='6'
            variant='outlined'
            defaultValue={value}
          />
        </Grid>
      )),
    [filtered, classes.textField, hasPerm, register, editMode]
  );

  if (!selectedRecord) return null;

  return (
    <Paper className={classes.root} elevation={3}>
      <Grid>
        <form onSubmit={handleSubmit(onSumbit)}>
          <Box className={classes.summaryBox}>
            <div className={classes.column}>
              <Typography className={classes.heading}>
                {selectedRecord?.client?.firstName} {selectedRecord?.client?.lastName}
              </Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                {new Date(selectedRecord?.createdAt).toDateString()}
              </Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                {selectedRecord?.entryType.replace(/^\w/, (c) => c.toUpperCase())}
              </Typography>
            </div>
            <FormControlLabel
              className={classes.switch}
              control={
                <Switch disabled={!hasPerm} checked={editMode} onChange={handleChange} name='edit' color='primary' />
              }
              label='Edit'
            />
          </Box>
          <Grid container spacing={2}>
            {MemoizedFields}
          </Grid>
          <Box className={classes.saveBtn}>
            <Button type='submit' disabled={!hasPerm || !editMode} variant='outlined' size='small' color='primary'>
              Save
            </Button>
          </Box>
        </form>
      </Grid>
    </Paper>
  );
}
