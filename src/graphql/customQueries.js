export const listClientRecordsWithClient = `
query listClientRecordsWithClient($filter: ModelClientRecordFilterInput, $limit: Int, $nextToken: String) {
  listClientRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      shift
      entryType
      client {
        id
        firstName
        lastName
      }
      entry {
        id
      }
    }
    nextToken
  }
}
`;

export const getPlainEntry = /* GraphQL */ `
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
    }
  }
`;

export const getStaffByUsername = /* GraphQL */ `
  query GetStaff($username: String!) {
    getStaff(username: $username) {
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
    }
  }
`;

export const getCompanyWithDependencyIds = `
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
        email
        phone_number
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
}`;

export const listCompanysWithStaffAndClients = /* GraphQL */ `
  query ListCompanys($filter: ModelCompanyFilterInput, $limit: Int, $nextToken: String) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        companyLogoUrl
        staff {
          items {
            firstName
            lastName
            username
            userType
            email
            phone_number
            password
            isActive
            permissions
            id
          }
          nextToken
        }
        name
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
      }
      nextToken
    }
  }
`;
