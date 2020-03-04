import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { API, graphqlOperation } from 'aws-amplify';
import { getEntry } from '../../graphql/queries';
import { useStoreState } from 'easy-peasy';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

export default function Summary() {
  const classes = useStyles();
  const [entries, setEntries] = useState([]);
  const selectedRecord = useStoreState(state => state.clientRecordModel.selectedRecord);

  useEffect(() => {
    if (selectedRecord) {
      const fetchEntries = async () => {
        const ret = await API.graphql(graphqlOperation(getEntry, { id: selectedRecord.entry.id }));
        setEntries()
      };
      fetchEntries();
    }
  }, [selectedRecord]);

  return (
    <div className={classes.root}>
      {/* <GridList className={classes.gridList} cols={2.5}>
        {entries.map((tile, index) => (
          <GridListTile key={index}>
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList> */}
    </div>
  );
}
