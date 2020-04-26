/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      photoUrl
      staff {
        nextToken
      }
      client {
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
        photoUrl
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
      password
      photoUrl
      phone_number
      clientRecords {
        nextToken
      }
      company {
        id
        name
        photoUrl
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
        password
        photoUrl
        phone_number
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
      photoUrl
      clientRecords {
        nextToken
      }
      company {
        id
        name
        photoUrl
        isActive
      }
      residence {
        id
        name
        photoUrl
        isActive
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
        photoUrl
      }
      nextToken
    }
  }
`;
export const getResidence = /* GraphQL */ `
  query GetResidence($id: ID!) {
    getResidence(id: $id) {
      id
      name
      photoUrl
      isActive
      address {
        firstLine
        county
        postCode
      }
      clients {
        nextToken
      }
    }
  }
`;
export const listResidences = /* GraphQL */ `
  query ListResidences(
    $filter: ModelResidenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResidences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        photoUrl
        isActive
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
        password
        photoUrl
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
        photoUrl
      }
      archived {
        nextToken
      }
      updatedBy
      status
      entryType
      createdAt
      shift
      moodAndInteraction
      selfCare
      physicalHealth
      medication
      leave
      dietAndFluids
      livingSkills
      finances
      dailyActivityParticipation
      version
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
        updatedBy
        status
        entryType
        createdAt
        shift
        moodAndInteraction
        selfCare
        physicalHealth
        medication
        leave
        dietAndFluids
        livingSkills
        finances
        dailyActivityParticipation
        version
      }
      nextToken
    }
  }
`;
export const getClientRecordArchived = /* GraphQL */ `
  query GetClientRecordArchived($id: ID!) {
    getClientRecordArchived(id: $id) {
      id
      staff {
        id
        firstName
        lastName
        username
        userType
        email
        password
        photoUrl
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
        photoUrl
      }
      mainRecord {
        id
        updatedBy
        status
        entryType
        createdAt
        shift
        moodAndInteraction
        selfCare
        physicalHealth
        medication
        leave
        dietAndFluids
        livingSkills
        finances
        dailyActivityParticipation
        version
      }
      updatedBy
      status
      entryType
      createdAt
      shift
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
  }
`;
export const listClientRecordArchiveds = /* GraphQL */ `
  query ListClientRecordArchiveds(
    $filter: ModelClientRecordArchivedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClientRecordArchiveds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        updatedBy
        status
        entryType
        createdAt
        shift
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
