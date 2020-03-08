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
          userName
          userType
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
          userName
          userType
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
          userName
          userType
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
      userName
      userType
      clientRecords {
        items {
          id
          date
          status
          shift
          entryType
        }
        nextToken
      }
      permissions {
        title
        value
        staff {
          id
          userName
          userType
        }
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
export const updateStaff = /* GraphQL */ `
  mutation UpdateStaff(
    $input: UpdateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    updateStaff(input: $input, condition: $condition) {
      id
      userName
      userType
      clientRecords {
        items {
          id
          date
          status
          shift
          entryType
        }
        nextToken
      }
      permissions {
        title
        value
        staff {
          id
          userName
          userType
        }
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
export const deleteStaff = /* GraphQL */ `
  mutation DeleteStaff(
    $input: DeleteStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    deleteStaff(input: $input, condition: $condition) {
      id
      userName
      userType
      clientRecords {
        items {
          id
          date
          status
          shift
          entryType
        }
        nextToken
      }
      permissions {
        title
        value
        staff {
          id
          userName
          userType
        }
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
          date
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
          date
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
          date
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
        userName
        userType
        clientRecords {
          nextToken
        }
        permissions {
          title
          value
        }
        company {
          id
          name
          companyLogoUrl
        }
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
          date
          status
          shift
          entryType
        }
      }
      date
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
        userName
        userType
        clientRecords {
          nextToken
        }
        permissions {
          title
          value
        }
        company {
          id
          name
          companyLogoUrl
        }
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
          date
          status
          shift
          entryType
        }
      }
      date
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
        userName
        userType
        clientRecords {
          nextToken
        }
        permissions {
          title
          value
        }
        company {
          id
          name
          companyLogoUrl
        }
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
          date
          status
          shift
          entryType
        }
      }
      date
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
      staff {
        id
        userName
        userType
        clientRecords {
          nextToken
        }
        permissions {
          title
          value
        }
        company {
          id
          name
          companyLogoUrl
        }
      }
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
      staff {
        id
        userName
        userType
        clientRecords {
          nextToken
        }
        permissions {
          title
          value
        }
        company {
          id
          name
          companyLogoUrl
        }
      }
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
      staff {
        id
        userName
        userType
        clientRecords {
          nextToken
        }
        permissions {
          title
          value
        }
        company {
          id
          name
          companyLogoUrl
        }
      }
    }
  }
`;
