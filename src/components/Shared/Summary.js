import React, { useEffect, useState } from 'react';
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
import { API, graphqlOperation } from 'aws-amplify';
import { getPlainEntry } from '../../graphql/customQueries';
import { useStoreState } from 'easy-peasy';
import _ from 'lodash';
import { hasPermissions } from '../../utils/permissions';

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
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  textField: { width: '100%' },
  column: {
    flexBasis: '33.33%',
    marginLeft: 10
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));
export default function Summary() {
  const classes = useStyles();
  const [entries, setEntries] = useState([]);
  const selectedRecord = useStoreState(state => state.clientRecordModel.selectedRecord);
  const user = useStoreState(state => state.user);

  useEffect(() => {
    if (selectedRecord) {
      const fetchEntries = async () => {
        const ret = await API.graphql(graphqlOperation(getPlainEntry, { id: selectedRecord.entry.id }));
        const mappedEntries = [];
        _.forIn(ret.data.getEntry, (value, key) => {
          if (key === 'id') {
            mappedEntries.push({ title: key, content: value });
            return;
          }
          const newKey = key
            .replace(/^\w/, c => c.toUpperCase())
            .split(/(?=[A-Z])/)
            .join(' ');
          mappedEntries.push({ title: newKey, content: value });
        });
        setEntries(mappedEntries);
      };
      fetchEntries();
    }
  }, [selectedRecord]);

  if (!selectedRecord) return null;
  const hasPerm = hasPermissions(user, 'editRecordSummary');

  return (
    <div className={classes.root}>
      <DataPanel
        name={selectedRecord.client.name}
        createdAt={selectedRecord.createdAt}
        entryType={selectedRecord.entryType}
      >
        <Grid container spacing={2}>
          {entries
            .filter(unit => unit.title !== 'id')
            .map((entry, index) => (
              <Grid key={entry.title} item lg={4} md={4} sm={6} xs={12}>
                <TextField
                  className={classes.textField}
                  disabled={!hasPerm}
                  id={`entry-summary-${entry.title}`}
                  label={entry.title}
                  multiline
                  rows='6'
                  variant='outlined'
                  value={entry.content}
                />
              </Grid>
            ))}
        </Grid>
      </DataPanel>
    </div>
  );
}

const DataPanel = ({ children, name, createdAt, entryType }) => {
  const user = useStoreState(state => state.user);
  const hasPerm = hasPermissions(user, 'saveRecordSummary');
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
