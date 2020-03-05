import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

export default function TextEntry({ field }) {
  const [expanded, setExpanded] = React.useState(true);
  const setRecord = useStoreActions(actions => actions.clientRecordModel.setEntry);
  const record = useStoreState(state => state.clientRecordModel.record);
  return (
    <div>
      <ExpansionPanel expanded={expanded} onChange={() => setExpanded(state => !state)}>
        <ExpansionPanelDetails>
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
