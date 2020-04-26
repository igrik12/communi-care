import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { RESIDENCE } from 'utils/constants';
import { useFetchPhoto } from 'utils/customHooks';
import ConfirmEntityDelete from '../ConfirmEntityDelete';
import clsx from 'clsx';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxHeight: 200,
    overflow: 'auto',
  },
  inline: {
    display: 'inline',
  },
  avatar: { color: '#fff', background: '#9187F2' },
  itemText: { color: '#9187F2' },
  titleRoot: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  logoText: {
    margin: theme.spacing(1),
    display: 'inline-block',
    width: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
  },
}));

const onResidenceChange = (residence, setFilteredResidence) => (event) => {
  if (!event.target.value) {
    setFilteredResidence(residence);
  } else {
    setFilteredResidence(residence.filter((stf) => stf.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }
};

const ResidenceList = ({ residences }) => {
  const classes = useStyles();

  const [filteredResidences, setFilteredResidences] = useState([]);

  useEffect(() => {
    setFilteredResidences(residences);
  }, [residences]);

  const photos = useFetchPhoto(residences);

  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);
  const [openDelete, setOpenDelete] = useState({ open: false, type: RESIDENCE, id: '' });

  return (
    <Box display='flex' flexDirection='column'>
      <Box>
        <TextField onChange={onResidenceChange(residences, setFilteredResidences)} label='Search' />
      </Box>
      <Box>
        <List className={classes.list}>
          {filteredResidences.map((residence, index) => {
            const image = photos?.find((pht) => pht.id === residence.id);
            return (
              <ListItem
                onClick={() => setEditOpen({ open: true, type: RESIDENCE, id: residence.id })}
                button
                key={residence.id}
                alignItems='flex-start'
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar} src={image?.photo} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.itemText}
                  primary={residence.name}
                  secondary={
                    <Tooltip title={residence.address?.firstLine}>
                      <Typography
                        component='span'
                        variant='body2'
                        className={clsx(classes.inline, classes.logoText)}
                        color='textPrimary'
                      >
                        Address: {residence.address?.firstLine}
                      </Typography>
                    </Tooltip>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color='secondary'
                    edge='end'
                    onClick={() => setOpenDelete({ open: true, type: RESIDENCE, id: residence.id })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={RESIDENCE} />
    </Box>
  );
};

export default ResidenceList;
