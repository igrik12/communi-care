import React, { useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Grid,
  ExpansionPanel,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  ExpansionPanelActions,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStoreState } from 'easy-peasy';
import _ from 'lodash';
import { hasPermissions } from 'utils/permissions';
import { textFields } from '../Records/TextEntries';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    textAlign: 'center'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(18),
    textAlign: 'center'
  },
  details: {
    alignItems: 'center'
  },
  textField: { width: '100%' },
  column: {
    flexBasis: '33.33%',
    marginLeft: 10
  }
}));

const fields = textFields.map(field => field.fieldId);
const toUpperKey = key =>
  key
    .replace(/^\w/, c => c.toUpperCase())
    .split(/(?=[A-Z])/)
    .join(' ');

export default function Summary() {
  const classes = useStyles();
  const selectedRecord = useStoreState(state => state.clientRecordModel.selectedRecord);
  const user = useStoreState(state => state.user);
  const hasPerm = hasPermissions(user, 'editRecordSummary');

  const filtered = _.pick(selectedRecord, fields);

  const MemoizedFields = useMemo(
    () =>
      _.map(filtered, (value, key) => (
        <Grid key={key} item lg={4} md={4} sm={6} xs={12}>
          <TextField
            className={classes.textField}
            disabled={!hasPerm}
            id={`entry-summary-${value}`}
            label={toUpperKey(key)}
            multiline
            rows='6'
            variant='outlined'
            value={value}
          />
        </Grid>
      )),
    [filtered, classes.textField, hasPerm]
  );
  if (!selectedRecord) return null;

  return (
    <div className={classes.root}>
      <DataPanel
        name={_.get(selectedRecord, 'client.firstName')}
        createdAt={_.get(selectedRecord, 'createdAt')}
        entryType={_.get(selectedRecord, 'entryType')}
      >
        <Grid container spacing={2}>
          {MemoizedFields}
        </Grid>
      </DataPanel>
    </div>
  );
}

const DataPanel = ({ children, name, createdAt, entryType }) => {
  const user = useStoreState(state => state.user);
  const hasPerm = hasPermissions(user, 'editRecordSummary');
  const classes = useStyles();
  return (
    <ExpansionPanel elevation={3} defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.column}>
          <Typography className={classes.heading}>{name}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>{new Date(createdAt).toDateString()}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>{entryType.replace(/^\w/, c => c.toUpperCase())}</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>{children}</ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button size='small'>Reset</Button>
        <Button disabled={!hasPerm} variant='outlined' size='small' color='primary'>
          Save
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};
