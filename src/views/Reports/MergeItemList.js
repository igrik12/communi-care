import React from 'react';
import MergeItem from './MergeItem';
import _ from 'lodash';
import { Box } from '@material-ui/core';

export const textFields = [
  {
    label: 'Mood and Interaction',
    fieldId: 'moodAndInteraction',
  },
  {
    label: 'Self Care',
    fieldId: 'selfCare',
  },
  {
    label: 'Health',
    fieldId: 'physicalHealth',
  },
  {
    label: 'Medication',
    fieldId: 'medication',
  },
  {
    label: 'Leave',
    fieldId: 'leave',
  },
  {
    label: 'Diet and Fluids',
    fieldId: 'dietAndFluids',
  },
  {
    label: 'Living Skills',
    fieldId: 'livingSkills',
  },
  {
    label: 'Finances',
    fieldId: 'finances',
  },
  {
    label: 'Daily Activity Participation',
    fieldId: 'dailyActivityParticipation',
  },
];

const MergeItemList = ({ version, data }) => {
  const mapped = _.map(data, (text, fieldId) => {
    const label = textFields.find((field) => field.fieldId === fieldId)?.label;
    return { label, fieldId, text };
  });
  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      {mapped.map((tab) => (
        <MergeItem key={tab.fieldId} fieldId={tab.fieldId} label={tab.label} text={tab.text} version={version} />
      ))}
    </Box>
  );
};

export default MergeItemList;
