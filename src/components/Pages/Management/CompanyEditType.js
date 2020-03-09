import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import CompanySelect from './CompanySelect';

// Matertial-UI imports
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const CompanyEditType = () => {
  const company = useStoreState(state => state.managementModel.company);
  const editType = useStoreState(state => state.managementModel.editType);
  const setCompany = useStoreActions(actions => actions.managementModel.setCompany);

  const handleChange = param => event => {
    setCompany({ [param]: event.target.value });
  };

  return (
    <div>
      {editType === 'new' ? (
        <FormControl>
          <TextField
            id='name'
            label='Company name'
            variant='outlined'
            onChange={handleChange('name')}
            value={company.name}
          />
          <TextField
            style={{ marginTop: 10 }}
            id='companyLogoUrl'
            label='Logo URL'
            variant='outlined'
            onChange={handleChange('companyLogoUrl')}
            value={company.companyLogoUrl}
          />
        </FormControl>
      ) : (
        <CompanySelect
          options={[
            { title: 'Company X', value: 'companyX' },
            { title: 'Company Y', value: 'companyY' }
          ]}
        />
      )}
    </div>
  );
};

export default CompanyEditType;
