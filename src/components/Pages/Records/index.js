import React from 'react';
import 'date-fns';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Auth } from 'aws-amplify';
import DateFnsUtils from '@date-io/date-fns';
import TextEntry from 'components/Shared/TextEntry';
import SaveConfirmDialog from 'components/Shared/SaveConfirmDialog';

// MUI Imports
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, FormControl, InputLabel, Input, InputAdornment, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  menu: {
    padding: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80%'
  }
}));

export default function ClientRecord() {
  return (
    <>
      <Grid container spacing={1} direction='column'>
        <Grid item>
          <RecordMeta />
        </Grid>
        <Grid item>
          <TextEntries />
        </Grid>
        <SaveConfirmDialog />
      </Grid>
    </>
  );
}

const textFields = [
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

const TextEntries = () => {
  return (
    <Grid container spacing={1}>
      {textFields.map((field, index) => {
        return (
          <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
            <TextEntry field={field} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const RecordMeta = () => {
  const classes = useStyles();
  const setRecord = useStoreActions(actions => actions.clientRecordModel.setRecord);
  const recordDate = useStoreState(state => state.clientRecordModel.record.recordDate);
  const shift = useStoreState(state => state.clientRecordModel.record.shift);
  const clients = useStoreState(state => state.clients);
  const clientId = useStoreState(state => state.clientRecordModel.record.clientId);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <>
      <Paper elevation={3} className={classes.menu}>
        <Grid container justify='flex-start' alignItems='center' spacing={3}>
          <Grid item sm={6} xs={6} md={3} lg={3}>
            <FormControl required className={classes.margin}>
              <InputLabel htmlFor='input-with-icon-adornment'>Staff Member</InputLabel>
              <Input
                id='input-with-icon-adornment'
                value={Auth.user.username}
                startAdornment={
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6} md={3} lg={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ marginBottom: 16 }}
                margin='normal'
                id='date-picker-dialog'
                label='Date'
                format='MM/dd/yyyy'
                value={recordDate}
                onChange={date => setRecord({ fieldId: 'recordDate', value: date })}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={6} xs={6} md={3} lg={3}>
            <FormControl required className={classes.formControl}>
              <InputLabel error={clientId === -1} shrink ref={inputLabel} id='select-client-label'>
                Client
              </InputLabel>
              <Select
                labelId='select-client-label'
                id='select-client'
                value={clientId}
                displayEmpty
                onChange={event => setRecord({ fieldId: 'clientId', value: event.target.value })}
                labelWidth={labelWidth}
              >
                <MenuItem value=''>
                  <em>Not Selected</em>
                </MenuItem>
                {clients.map(client => (
                  <MenuItem key={client.id} value={client.id}>
                    {`${client.firstName} ${client.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6} md={3} lg={3}>
            <FormControl required className={classes.formControl}>
              <InputLabel error={shift === 'not selected'} shrink ref={inputLabel} id='select-shift-label'>
                Shift
              </InputLabel>
              <Select
                labelId='select-shift-label'
                id='select-shift'
                value={shift}
                displayEmpty
                onChange={event => setRecord({ fieldId: 'shift', value: event.target.value })}
                labelWidth={labelWidth}
              >
                <MenuItem value=''>
                  <em>Not Selected</em>
                </MenuItem>
                <MenuItem value={'am'}>AM</MenuItem>
                <MenuItem value={'pm'}>PM</MenuItem>
                <MenuItem value={'night'}>Night</MenuItem>
                <MenuItem value={'ld'}>LD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};