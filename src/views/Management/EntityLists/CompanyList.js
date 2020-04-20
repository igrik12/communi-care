import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { COMPANY } from 'utils/constants';
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
import TextField from '@material-ui/core/TextField';
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

const onCompanyChange = (companies, setFilteredCompanies) => (event) => {
  if (!event.target.value) {
    setFilteredCompanies(companies);
  } else {
    setFilteredCompanies(
      companies.filter((company) => company.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  }
};

const CompanyList = ({ companies }) => {
  const classes = useStyles();
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  const setEditOpen = useStoreActions((actions) => actions.managementModel.setEditOpen);
  const [openDelete, setOpenDelete] = useState({ open: false, type: COMPANY, id: '' });
  return (
    <Box display='flex' flexDirection='column'>
      <Box>
        <TextField onChange={onCompanyChange(companies, setFilteredCompanies)} label='Search' />
      </Box>
      <Box>
        <List className={classes.list}>
          {filteredCompanies.map((company, index) => {
            return (
              <ListItem
                onClick={() => setEditOpen({ open: true, type: COMPANY, id: company.id })}
                button
                key={company.name + index}
                alignItems='flex-start'
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar} src={company.companyLogoUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={company.name}
                  className={classes.itemText}
                  secondary={
                    <Tooltip title={company.companyLogoUrl}>
                      <Typography
                        component='span'
                        variant='body2'
                        className={clsx(classes.inline, classes.logoText)}
                        color='textPrimary'
                      >
                        Company Logo URL: {company.companyLogoUrl}
                      </Typography>
                    </Tooltip>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color='secondary'
                    edge='end'
                    onClick={() => setOpenDelete({ open: true, type: COMPANY, id: company.id })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <ConfirmEntityDelete openDelete={openDelete} setOpenDelete={setOpenDelete} entity={COMPANY} />
    </Box>
  );
};

export default CompanyList;
