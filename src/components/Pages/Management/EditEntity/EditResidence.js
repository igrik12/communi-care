import React, { useEffect, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import _ from 'lodash';

export default function EditResidence() {
  const [residence, setResidence] = useState();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const residences = useStoreState(state => state.residences);
  useEffect(() => {
    const match = residences.find(residence => residence.id === editOpen.id);
    setResidence(match);
  }, [editOpen.id, residences]);

  if (_.isEmpty(residence)) return null;

  return <div>{residence.name}</div>;
}
