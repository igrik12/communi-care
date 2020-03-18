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
          firstName
          lastName
          username
          userType
          email
          phone_number
          permissions
          isActive
        }
        nextToken
      }
      client {
        items {
          id
          firstName
          lastName
          dateOfBirth
          isActive
        }
        nextToken
      }
      isActive
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
        isActive
      }
      nextToken
    }
  }
`;
export const getStaff = /* GraphQL */ `
  query GetStaff($id: ID!) {
    getStaff(id: $id) {
      id
      firstName
      lastName
      username
      userType
      email
      phone_number
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
        isActive
      }
      permissions
      isActive
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
        firstName
        lastName
        username
        userType
        email
        phone_number
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
          isActive
        }
        permissions
        isActive
      }
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      isActive
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
        isActive
      }
      residency {
        id
        name
        address {
          firstLine
          county
          postCode
        }
        client {
          id
          firstName
          lastName
          dateOfBirth
          isActive
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
        firstName
        lastName
        dateOfBirth
        isActive
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
          isActive
        }
        residency {
          id
          name
        }
      }
      nextToken
    }
  }
`;
export const getResidency = /* GraphQL */ `
  query GetResidency($id: ID!) {
    getResidency(id: $id) {
      id
      name
      address {
        firstLine
        county
        postCode
      }
      client {
        id
        firstName
        lastName
        dateOfBirth
        isActive
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
          isActive
        }
        residency {
          id
          name
        }
      }
    }
  }
`;
export const listResidencys = /* GraphQL */ `
  query ListResidencys(
    $filter: ModelResidencyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResidencys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address {
          firstLine
          county
          postCode
        }
        client {
          id
          firstName
          lastName
          dateOfBirth
          isActive
        }
      }
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
      firstLine
      county
      postCode
    }
  }
`;
export const listAddresss = /* GraphQL */ `
  query ListAddresss(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        firstLine
        county
        postCode
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
        firstName
        lastName
        username
        userType
        email
        phone_number
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
          isActive
        }
        permissions
        isActive
      }
      client {
        id
        firstName
        lastName
        dateOfBirth
        isActive
        clientRecords {
          nextToken
        }
        company {
          id
          name
          companyLogoUrl
          isActive
        }
        residency {
          id
          name
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
          firstName
          lastName
          username
          userType
          email
          phone_number
          permissions
          isActive
        }
        client {
          id
          firstName
          lastName
          dateOfBirth
          isActive
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
          firstName
          lastName
          username
          userType
          email
          phone_number
          permissions
          isActive
        }
        client {
          id
          firstName
          lastName
          dateOfBirth
          isActive
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
