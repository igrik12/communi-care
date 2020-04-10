import React from 'react';
import TextEntry from './TextEntry';
import Grid from '@material-ui/core/Grid';

export const textFields = [
  {
    label: 'Mood and Interaction',
    fieldId: 'moodAndInteraction'
  },
  {
    label: 'Self Care',
    fieldId: 'selfCare'
  },
  {
    label: 'Health',
    fieldId: 'physicalHealth'
  },
  {
    label: 'Medication',
    fieldId: 'medication'
  },
  {
    label: 'Leave',
    fieldId: 'leave'
  },
  {
    label: 'Diet and Fluids',
    fieldId: 'dietAndFluids'
  },
  {
    label: 'Living Skills',
    fieldId: 'livingSkills'
  },
  {
    label: 'Finances',
    fieldId: 'finances'
  },
  {
    label: 'Daily Activity Participation',
    fieldId: 'dailyActivityParticipation'
  }
];

const TextEntries = ({ control }) => {
  return (
    <Grid container spacing={1}>
      {textFields.map((field, index) => {
        return (
          <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
            <TextEntry control={control} field={field} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TextEntries;
