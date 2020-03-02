import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  summary: {
    backgroundColor: '#1E88E5'
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

export default function TextEntry({ field, onChange }) {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <div>
      <ExpansionPanel expanded={expanded} onChange={() => setExpanded(state => !state)}>
        {/* <ExpansionPanelSummary >
          <Typography>{title}</Typography>
        </ExpansionPanelSummary> */}
        <ExpansionPanelDetails>
          <TextField
            onChange={event => onChange({ fieldId: field.fieldId, value: event.target.value })}
            id='outlined-multiline-static'
            label={field.label}
            multiline
            fullWidth
            rows='6'
            variant='outlined'
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
