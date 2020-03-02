/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStaff = /* GraphQL */ `
  query GetStaff($id: ID!) {
    getStaff(id: $id) {
      id
      userName
      userType
      clientRecords {
        nextToken
      }
    }
  }
`;
export const listStaffs = /* GraphQL */ `
  query ListStaffs(
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaffs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        userType
      }
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      clientRecords {
        nextToken
      }
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
export const getClientRecord = /* GraphQL */ `
  query GetClientRecord($id: ID!) {
    getClientRecord(id: $id) {
      id
      staff {
        id
        userName
        userType
      }
      client {
        id
        name
      }
      entry {
        id
        moodAndInteraction
        selfCare
        physicalHealth
        medication
        leave
        dietAndFluids
        livingSkills
        finances
        dailyActivityParticipation
      }
      date
      status
      shift
      entryType
    }
  }
`;
export const listClientRecords = /* GraphQL */ `
  query ListClientRecords(
    $filter: ModelClientRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        status
        shift
        entryType
      }
      nextToken
    }
  }
`;
export const getEntry = /* GraphQL */ `
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
      id
      moodAndInteraction
      selfCare
      physicalHealth
      medication
      leave
      dietAndFluids
      livingSkills
      finances
      dailyActivityParticipation
      clientRecord {
        id
        date
        status
        shift
        entryType
      }
    }
  }
`;
export const listEntrys = /* GraphQL */ `
  query ListEntrys(
    $filter: ModelEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        moodAndInteraction
        selfCare
        physicalHealth
        medication
        leave
        dietAndFluids
        livingSkills
        finances
        dailyActivityParticipation
      }
      nextToken
    }
  }
`;
