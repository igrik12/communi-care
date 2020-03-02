import React, { useEffect, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listEntrys } from '../../graphql/queries';
import MaterialTable from 'material-table';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function CareReports() {
  const entries = useStoreState(state => state.clientRecordModel.entries);
  const setEntries = useStoreActions(actions => actions.clientRecordModel.setEntries);
  useEffect(() => {
    const query = async () => {
      const ret = await API.graphql(graphqlOperation(listEntrys));
      setEntries(ret.data.listEntrys.items);
    };
    query();
  }, []);

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'Mood and Interaction', field: 'moodAndInteraction' },
          { title: 'Self Care', field: 'selfCare' },
          { title: 'Health', field: 'health' },
          { title: 'Medication', field: 'medication' },
          { title: 'Leave', field: 'leave' },
          { title: 'Diet and Fluids', field: 'dietAndFluids' },
          { title: 'Living Skills', field: 'livingSkills' },
          { title: 'Finance', field: 'finance' },
          { title: 'Daily Activity Participation', field: 'dailyActivityParticipation' }
        ]}
        data={entries}
        title='Client Report Entries'
      />
    </div>
  );
}
