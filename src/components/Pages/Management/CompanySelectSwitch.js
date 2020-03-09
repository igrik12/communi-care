import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

// Material-UI imports
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  selectFormControl: {
    margin: theme.spacing(1)
  }
}));

const CompanySelectSwitch = () => {
  const editType = useStoreState(state => state.managementModel.editType);
  const setEditType = useStoreActions(actions => actions.managementModel.setEditType);

  const handleChange = event => {
    setEditType(event.target.value);
  };

  const classes = useStyles();
  return (
    <FormControl component='fieldset' className={classes.selectFormControl}>
      <FormLabel component='legend'>Select company option</FormLabel>
      <RadioGroup
        style={{ display: 'inline' }}
        aria-label='company-create'
        name='company-create'
        value={editType}
        onChange={handleChange}
      >
        <FormControlLabel value='new' control={<Radio color='primary' />} label='New' />
        <FormControlLabel value='select' control={<Radio color='primary' />} label='Select' />
      </RadioGroup>
    </FormControl>
  );
};
export default CompanySelectSwitch;
