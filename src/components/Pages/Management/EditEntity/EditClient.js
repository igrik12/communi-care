import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

export default function EditClient() {
  const [client, setClient] = useState();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const clients = useStoreState(state => state.clients);
  useEffect(() => {
    const match = clients.find(company => company.id === editOpen.id);
    setClient(match);
  }, [editOpen.id, clients]);
  
  if (_.isEmpty(client)) return null;

  return <div>{client.name}</div>;
}
