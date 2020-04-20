import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useFetchPhoto } from 'utils/customHooks';
import { CLIENT } from 'utils/constants';
import ConfirmEntityDelete from '../ConfirmEntityDelete';

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
import DeleteIcon from '@material-ui/icons/Delete';

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
}));

const ClientList = ({ clients }) => {
  const classes = useStyles();
  const [openDelete, setOpenDelete] = useState({ open: false, type: CLIENT, id: '' });
  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);
  const photos = useFetchPhoto(clients);

  return (
    <>
      <List className={classes.list}>
        {clients.map((client, index) => {
          const image = photos?.find((pht) => pht.id === client.id);
          return (
            <ListItem
              onClick={() => setEditOpen({ open: true, type: CLIENT, id: client.id })}
              button
              key={client.id}
              alignItems='flex-start'
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar} src={image?.photo} />
              </ListItemAvatar>
              <ListItemText
                className={classes.itemText}
                primary={`${client.firstName} ${client.lastName}`}
                secondary={
                  <>
                    <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                      Active: {client.isActive ? 'Yes' : 'No'}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  color='secondary'
                  edge='end'
                  onClick={() => setOpenDelete({ open: true, type: CLIENT, id: client.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={CLIENT} />
    </>
  );
};

export default ClientList;
