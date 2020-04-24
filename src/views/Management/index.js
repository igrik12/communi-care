import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
// Material-UI imports
import TabsPanel from './TabsPanel';

export default function Management() {
  const setupSubscription = useStoreActions((actions) => actions.managementModel.setupSubscription);
  const unsubscribe = useStoreActions((actions) => actions.managementModel.unsubscribe);
  useEffect(() => {
    setupSubscription();
    return () => {
      unsubscribe();
    };
  }, [setupSubscription, unsubscribe]);
  return <TabsPanel />;
}
