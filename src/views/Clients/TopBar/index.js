import React from 'react';
import TopBar from './TopBar';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function TopBarContainer() {
  const selectedClient = useStoreState((state) => state.clientsModel.selectedClient);
  const companyData = useStoreState((state) => state.companyData);
  const setSelectedClient = useStoreActions((actions) => actions.clientsModel.setSelectedClient);

  const handleSelect = (client) => {
    setSelectedClient(client);
  };

  const clients = companyData?.company?.client?.items;
  if (!clients) return null;
  return <TopBar selectedClient={selectedClient} clients={clients} selectClient={handleSelect} />;
}
