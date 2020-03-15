/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      companyLogoUrl
      staff {
        items {
          id
          username
          userType
          permissions
        }
        nextToken
      }
      client {
        items {
          id
          name
        }
        nextToken
      }
    }
  }
`;
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        companyLogoUrl
        staff {
          nextToken
        }
        client {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getStaff = /* GraphQL */ `
  query GetStaff($id: ID!) {
    getStaff(id: $id) {
      id
      username
      userType
      clientRecords {
        items {
          id
          createdAt
          status
          shift
          entryType
        }
        nextToken
      }
      company {
        id
        name
        companyLogoUrl
        staff {
          nextToken
        }
        client {
          nextToken
        }
      }
      permissions
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
        username
        userType
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
        }
        permissions
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
        items {
          id
          createdAt
          status
          shift
          entryType
        }
        nextToken
      }
      company {
        id
        name
        companyLogoUrl
        staff {
          nextToken
        }
        client {
          nextToken
        }
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
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
        }
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
        username
        userType
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
        }
        permissions
      }
      client {
        id
        name
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
        }
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
        clientRecord {
          id
          createdAt
          status
          shift
          entryType
        }
      }
      createdAt
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
        staff {
          id
          username
          userType
          permissions
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
        createdAt
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
        staff {
          id
          username
          userType
          permissions
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
        createdAt
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
        clientRecord {
          id
          createdAt
          status
          shift
          entryType
        }
      }
      nextToken
    }
  }
`;
export const getPermission = /* GraphQL */ `
  query GetPermission($id: ID!) {
    getPermission(id: $id) {
      title
      value
    }
  }
`;
export const listPermissions = /* GraphQL */ `
  query ListPermissions(
    $filter: ModelPermissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        value
      }
      nextToken
    }
  }
`;
