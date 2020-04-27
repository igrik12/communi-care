import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useFetchPhoto } from 'utils/customHooks';
import { STAFF } from 'utils/constants';
import ConfirmEntityDelete from '../ConfirmEntityDelete';

// MUI imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxHeight: 450,
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

const onStaffChange = (staff, setFilteredStaff) => (event) => {
  if (!event.target.value) {
    setFilteredStaff(staff);
  } else {
    setFilteredStaff(staff.filter((stf) => stf.username.toLowerCase().includes(event.target.value.toLowerCase())));
  }
};

const StaffList = ({ staff }) => {
  const classes = useStyles();
  const [filteredStaff, setFilteredStaff] = useState([]);

  useEffect(() => {
    setFilteredStaff(staff);
  }, [staff]);

  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);
  const photos = useFetchPhoto(staff);
  const [openDelete, setOpenDelete] = useState({ open: false, type: STAFF, id: '' });
  return (
    <Box display='flex' flexDirection='column'>
      <Box>
        <TextField onChange={onStaffChange(staff, setFilteredStaff)} label='Search' />
      </Box>
      <Box>
        <List className={classes.list}>
          {filteredStaff.map((st) => {
            const image = photos?.find((pht) => pht.id === st.id);
            return (
              <ListItem
                onClick={() => setEditOpen({ open: true, type: STAFF, id: st.id })}
                button
                key={st.id}
                alignItems='flex-start'
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar} src={image?.photo} />
                </ListItemAvatar>
                <ListItemText
                  className={classes.itemText}
                  primary={st.username}
                  secondary={
                    <>
                      <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                        Email: {st.email}
                      </Typography>
                      <br />
                      Active: {st.isActive ? 'Yes' : 'No'}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color='secondary'
                    edge='end'
                    onClick={() => setOpenDelete({ open: true, type: STAFF, id: st.id })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={STAFF} />
    </Box>
  );
};

export default StaffList;
