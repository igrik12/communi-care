/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        nextToken
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
        nextToken
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
        nextToken
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
        nextToken
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
        nextToken
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
        nextToken
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
        date
        status
        shift
        entryType
      }
    }
  }
`;
