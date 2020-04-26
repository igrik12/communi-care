import React, { useMemo } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from 'lodash';
import { difference } from 'utils/helpers';
import MergeItemList from './MergeItemList';
import { textFields } from '../Records/TextEntries';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';

// core components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Primary from 'components/Typography/Primary';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(3),
  },
  confirmItem: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    padding: theme.spacing(2),
  },
}));

const fields = textFields.map((field) => field.fieldId);

export default function ConfirmUpdate({ originalData, mergeData }) {
  const mergeWindow = useStoreState((state) => state.clientRecordModel.mergeWindow);
  const user = useStoreState((state) => state.user);
  const openMergeWindow = useStoreActions((actions) => actions.clientRecordModel.openMergeWindow);
  const updateRecord = useStoreActions((actions) => actions.clientRecordModel.updateRecord);
  const mergeItem = useStoreState((state) => state.clientRecordModel.mergeItem);
  const classes = useStyles();

  const handleClose = () => {
    openMergeWindow({ open: false });
  };

  const extractMergeData = (mergeItem) => {
    const extracted = {};
    _.forEach(mergeItem, (obj, key) => {
      return (extracted[key] = obj.value);
    });
    return extracted;
  };

  const handleSave = () => {
    const extracted = extractMergeData(mergeItem);
    const final = { ..._.omit(originalData, ['version', 'client', 'staff', 'archived']), ...extracted };
    const updateDetails = {
      id: originalData.id,
      updatedBy: user.id,
      clientRecordClientId: originalData.client.id,
      clientRecordStaffId: originalData.staff.id,
      expectedVersion: originalData.version,
      ...final,
    };
    updateRecord(updateDetails);
    openMergeWindow({ open: false });
  };

  const originalDataPicked = _.pick(originalData, fields);
  const mergeDataPicked = _.pick(mergeData, fields);

  const originalDiff = difference(mergeDataPicked, originalDataPicked);
  const mergeDiff = difference(originalDataPicked, mergeDataPicked);
  const disabledMemo = useMemo(() => {
    return (
      Object.values(originalDiff).length !== Object.values(mergeItem).length ||
      Object.values(mergeItem).some((item) => !item.checked)
    );
  }, [originalDiff, mergeItem]);

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={mergeWindow.open} onClose={handleClose}>
      <Typography className={classes.title} variant='h5' color='secondary'>
        The record has been modified
      </Typography>
      <DialogContent>
        <GridContainer spacing={1}>
          <GridItem xl={6} lg={6} md={6} sm={12} xs={12}>
            <ConfirmItem
              version='original'
              data={originalDiff}
              updated={{
                author: `${originalData.staff.firstName} ${originalData.staff.lastName}`,
                updatedAt: new Date(originalData.createdAt).toLocaleString(),
              }}
            />
          </GridItem>
          <GridItem xl={6} lg={6} md={6} sm={12} xs={12}>
            <ConfirmItem
              version='current'
              data={mergeDiff}
              updated={{
                author: `${user.firstName} ${user.lastName}`,
                updatedAt: new Date(mergeData.createdAt).toLocaleString(),
              }}
            />
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <ButtonGroup>
          <Button onClick={handleClose} color='secondary'>
            Close
          </Button>
          <Button disabled={disabledMemo} onClick={handleSave} color='primary'>
            Save
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

const ConfirmItem = ({ version, data, updated }) => {
  const classes = useStyles();
  return (
    <Box>
      <div className={classes.confirmItem}>
        <Typography variant='h5'>{version.toUpperCase()}</Typography>
        <Primary>
          Updated by {updated.author} at {updated.updatedAt}
        </Primary>
      </div>
      <MergeItemList version={version} data={data} />
    </Box>
  );
};
