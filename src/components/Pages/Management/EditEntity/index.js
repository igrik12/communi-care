import React from 'react';
import { useStoreState } from 'easy-peasy';
import EditStaff from './EditStaff';
import EditClient from './EditClient';
import EditCompany from './EditCompany';
import EditResidence from './EditResidence';
import { STAFF, CLIENT, COMPANY, RESIDENCE } from 'utils/constants';

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
      case RESIDENCE:
        return <EditResidence />;
      default:
        throw new Error('Unknown type of edit entity!');
    }
  };
  return <>{Type(editOpen.type)}</>;
}
