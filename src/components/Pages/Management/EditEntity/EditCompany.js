import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

export default function EditCompany() {
  const [company, setCompany] = useState();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const companies = useStoreState(state => state.companies);
  useEffect(() => {
    const match = companies.find(company => company.id === editOpen.id);
    setCompany(match);
  }, [editOpen.id]);
  if (_.isEmpty(company)) return null;

  return <div>{company.name}</div>;
}
