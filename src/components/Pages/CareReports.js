import React, { useEffect, useState } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listEntrys, listClientRecords } from '../../graphql/queries';
import MaterialTable from 'material-table';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function CareReports() {
  const entries = useStoreState(state => state.clientRecordModel.entries);
  const records = useStoreState(state => state.clientRecordModel.records);
  const setRecords = useStoreActions(actions => actions.clientRecordModel.setRecords);
  const setEntries = useStoreActions(actions => actions.clientRecordModel.setEntries);
  console.log(records);
  useEffect(() => {
    const query = async () => {
      // Ret records and then modify table retrieval mechanism
      const ret = await API.graphql(graphqlOperation(listClientRecords));
      setRecords(ret.data.listClientRecords.items);

      const ret2 = await API.graphql(graphqlOperation(listEntrys));
      setEntries(ret2.data.listEntrys.items);
    };
    query();
  }, []);

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'Mood and Interaction', field: 'moodAndInteraction' },
          { title: 'Self Care', field: 'selfCare' },
          { title: 'Health', field: 'physicalHealth' },
          { title: 'Medication', field: 'medication' },
          { title: 'Leave', field: 'leave' },
          { title: 'Diet and Fluids', field: 'dietAndFluids' },
          { title: 'Living Skills', field: 'livingSkills' },
          { title: 'Finance', field: 'finances' },
          { title: 'Daily Activity Participation', field: 'dailyActivityParticipation' }
        ]}
        data={entries}
        title='Client Report Entries'
      />
    </div>
  );
}
