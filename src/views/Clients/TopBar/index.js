import React from 'react';
import TopBar from './TopBar';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

export default function TopBarContainer() {
  const selectedClient = useStoreState((state) => state.clientsModel.selectedClient);
  const companyData = useStoreState((state) => state.companyData);
  const setSelectedClient = useStoreActions((actions) => actions.clientsModel.setSelectedClient);

  useEffect(() => {
    setSelectedClient(companyData?.clients[0]);
  }, [companyData, setSelectedClient]);

  const handleSelect = (event) => {
    const match = companyData.clients.find((client) => client.id === event.target.value);
    setSelectedClient(match);
  };

  if (!companyData?.clients || !selectedClient) return null;

  return <TopBar selectedClient={selectedClient} clients={companyData.clients} selectClient={handleSelect} />;
}
