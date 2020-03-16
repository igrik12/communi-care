import React from 'react';
import { useStoreState } from 'easy-peasy';
import EditStaff from './EditStaff';
import EditClient from './EditClient';
import EditCompany from './EditCompany';
import { STAFF, CLIENT, COMPANY } from 'utils/constants';

export default function EditEntity() {
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const Type = type => {
    switch (type) {
      case STAFF:
        return <EditStaff />;
      case CLIENT:
        return <EditClient />;
      case COMPANY:
        return <EditCompany />;
      default:
        throw new Error('Unknown type of edit entity!');
    }
  };
  return <>{Type(editOpen.type)}</>;
}
