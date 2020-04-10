import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
  },
}));

export default function MergeItem({ fieldId, label, text, version }) {
  const classes = useStyles();
  const [value, setValue] = useState(text);
  const handleOnClick = ({ fieldId, version }) => (event) => {
    setMergeItem({ fieldId, value, versionType: version, checked: event.target.checked });
  };
  const mergeItem = useStoreState((state) => state.clientRecordModel.mergeItem);
  const setMergeItem = useStoreActions((actions) => actions.clientRecordModel.setMergeItem);

  const versionType = mergeItem[fieldId]?.versionType;
  const checked = mergeItem[fieldId]?.checked ?? false;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={
              <Checkbox
                checked={checked && versionType === version}
                disabled={checked && versionType !== version}
                onChange={handleOnClick({ fieldId, version })}
              />
            }
            style={{ color: 'black' }}
            label={label}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            fullWidth
            disabled={mergeItem[fieldId]?.checked}
            multiline
            rows='6'
            onChange={(event) => setValue(event.target.value)}
            variant='outlined'
            value={value}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
