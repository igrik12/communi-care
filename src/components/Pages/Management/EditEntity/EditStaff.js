import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';

export default function EditStaff() {
  const [currentStaff, setCurrentStaff] = useState();
  const editOpen = useStoreState(state => state.managementModel.editOpen);
  const staff = useStoreState(state => state.staff);
  useEffect(() => {
    const match = staff.find(st => st.id === editOpen.id);
    setCurrentStaff(match);
  }, [editOpen.id]);
  if (_.isEmpty(currentStaff)) return null;

  return <div>{currentStaff.username}</div>;
}
