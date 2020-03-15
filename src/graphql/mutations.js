/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
  }
`;
export const createStaff = /* GraphQL */ `
  mutation CreateStaff(
    $input: CreateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    createStaff(input: $input, condition: $condition) {
      id
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
      }
      permissions
    }
  }
`;
export const updateStaff = /* GraphQL */ `
  mutation UpdateStaff(
    $input: UpdateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    updateStaff(input: $input, condition: $condition) {
      id
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
      }
      permissions
    }
  }
`;
export const deleteStaff = /* GraphQL */ `
  mutation DeleteStaff(
    $input: DeleteStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    deleteStaff(input: $input, condition: $condition) {
      id
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
      }
      permissions
    }
  }
`;
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
export const createClientRecord = /* GraphQL */ `
  mutation CreateClientRecord(
    $input: CreateClientRecordInput!
    $condition: ModelClientRecordConditionInput
  ) {
    createClientRecord(input: $input, condition: $condition) {
      id
      staff {
        id
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
export const updateClientRecord = /* GraphQL */ `
  mutation UpdateClientRecord(
    $input: UpdateClientRecordInput!
    $condition: ModelClientRecordConditionInput
  ) {
    updateClientRecord(input: $input, condition: $condition) {
      id
      staff {
        id
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
export const deleteClientRecord = /* GraphQL */ `
  mutation DeleteClientRecord(
    $input: DeleteClientRecordInput!
    $condition: ModelClientRecordConditionInput
  ) {
    deleteClientRecord(input: $input, condition: $condition) {
      id
      staff {
        id
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
export const createEntry = /* GraphQL */ `
  mutation CreateEntry(
    $input: CreateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    createEntry(input: $input, condition: $condition) {
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
          email
          phone_number
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
export const updateEntry = /* GraphQL */ `
  mutation UpdateEntry(
    $input: UpdateEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    updateEntry(input: $input, condition: $condition) {
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
          email
          phone_number
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
export const deleteEntry = /* GraphQL */ `
  mutation DeleteEntry(
    $input: DeleteEntryInput!
    $condition: ModelEntryConditionInput
  ) {
    deleteEntry(input: $input, condition: $condition) {
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
          email
          phone_number
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
export const createPermission = /* GraphQL */ `
  mutation CreatePermission(
    $input: CreatePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    createPermission(input: $input, condition: $condition) {
      title
      value
    }
  }
`;
export const updatePermission = /* GraphQL */ `
  mutation UpdatePermission(
    $input: UpdatePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    updatePermission(input: $input, condition: $condition) {
      title
      value
    }
  }
`;
export const deletePermission = /* GraphQL */ `
  mutation DeletePermission(
    $input: DeletePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    deletePermission(input: $input, condition: $condition) {
      title
      value
    }
  }
`;
