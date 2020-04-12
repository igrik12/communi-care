import React from 'react';

import TopBar from './TopBar';

// core components
import Container from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

export default function Clients() {
  return (
    <Container>
      <GridItem xl={12} lg={12} md={12} sm={12} xs={12}>
        <TopBar />
      </GridItem>
      <GridItem xl={6} lg={6} md={12} sm={12} xs={12}>
        <Profile />
      </GridItem>
      <GridItem xl={6} lg={6} md={12} sm={12} xs={12}>
        <Table />
      </GridItem>
      <GridItem xl={12} lg={12} md={12} sm={12} xs={12}>
        <Profile />
      </GridItem>
    </Container>
  );
}

const Profile = () => {
  return <div>Profile</div>;
};

const Table = () => {
  return <div>Table</div>;
};
