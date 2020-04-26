import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import Profile from './Profile';

export default function ProfileContainer() {
  const [clientInfo, setClientInfo] = useState();
  const selectedClient = useStoreState((state) => state.clientsModel.selectedClient);
  const clients = useStoreState((state) => state.clients);

  useEffect(() => {
    if (!selectedClient) return;
    const match = clients.find((client) => client.id === selectedClient.id);
    setClientInfo(match);
  }, [clients, selectedClient]);

  if (!clientInfo) return null;
  return <Profile clientInfo={clientInfo} selectedClient={selectedClient} clients={clients} />;
}
