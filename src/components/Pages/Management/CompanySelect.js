import React, { useState } from 'react';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const CompanySelect = ({ options }) => {
  const classes = useStyles();
  const [company, setCompany] = useState('');
  const handleChange = event => {
    setCompany(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='company-select-label'>Company</InputLabel>
      <Select id='company-select' value={company} onChange={handleChange}>
        {options &&
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CompanySelect;
