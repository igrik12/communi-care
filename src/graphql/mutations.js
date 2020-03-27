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
          firstName
          lastName
          username
          userType
          email
          password
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
          firstName
          lastName
          username
          userType
          email
          password
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
          firstName
          lastName
          username
          userType
          email
          password
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
export const createStaff = /* GraphQL */ `
  mutation CreateStaff(
    $input: CreateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    createStaff(input: $input, condition: $condition) {
      id
      firstName
      lastName
      username
      userType
      email
      password
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
export const updateStaff = /* GraphQL */ `
  mutation UpdateStaff(
    $input: UpdateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    updateStaff(input: $input, condition: $condition) {
      id
      firstName
      lastName
      username
      userType
      email
      password
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
export const deleteStaff = /* GraphQL */ `
  mutation DeleteStaff(
    $input: DeleteStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    deleteStaff(input: $input, condition: $condition) {
      id
      firstName
      lastName
      username
      userType
      email
      password
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
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
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
      residence {
        id
        name
        address {
          id
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
      residence {
        id
        name
        address {
          id
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
      residence {
        id
        name
        address {
          id
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
export const createResidence = /* GraphQL */ `
  mutation CreateResidence(
    $input: CreateResidenceInput!
    $condition: ModelResidenceConditionInput
  ) {
    createResidence(input: $input, condition: $condition) {
      id
      name
      address {
        id
        firstLine
        county
        postCode
        residence {
          id
          name
        }
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
        residence {
          id
          name
        }
      }
    }
  }
`;
export const updateResidence = /* GraphQL */ `
  mutation UpdateResidence(
    $input: UpdateResidenceInput!
    $condition: ModelResidenceConditionInput
  ) {
    updateResidence(input: $input, condition: $condition) {
      id
      name
      address {
        id
        firstLine
        county
        postCode
        residence {
          id
          name
        }
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
        residence {
          id
          name
        }
      }
    }
  }
`;
export const deleteResidence = /* GraphQL */ `
  mutation DeleteResidence(
    $input: DeleteResidenceInput!
    $condition: ModelResidenceConditionInput
  ) {
    deleteResidence(input: $input, condition: $condition) {
      id
      name
      address {
        id
        firstLine
        county
        postCode
        residence {
          id
          name
        }
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
        residence {
          id
          name
        }
      }
    }
  }
`;
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
      firstLine
      county
      postCode
      residence {
        id
        name
        address {
          id
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
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
      id
      firstLine
      county
      postCode
      residence {
        id
        name
        address {
          id
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
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      firstLine
      county
      postCode
      residence {
        id
        name
        address {
          id
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
export const createClientRecord = /* GraphQL */ `
  mutation CreateClientRecord(
    $input: CreateClientRecordInput!
    $condition: ModelClientRecordConditionInput
  ) {
    createClientRecord(input: $input, condition: $condition) {
      id
      staff {
        id
        firstName
        lastName
        username
        userType
        email
        password
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
        residence {
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
export const updateClientRecord = /* GraphQL */ `
  mutation UpdateClientRecord(
    $input: UpdateClientRecordInput!
    $condition: ModelClientRecordConditionInput
  ) {
    updateClientRecord(input: $input, condition: $condition) {
      id
      staff {
        id
        firstName
        lastName
        username
        userType
        email
        password
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
        residence {
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
export const deleteClientRecord = /* GraphQL */ `
  mutation DeleteClientRecord(
    $input: DeleteClientRecordInput!
    $condition: ModelClientRecordConditionInput
  ) {
    deleteClientRecord(input: $input, condition: $condition) {
      id
      staff {
        id
        firstName
        lastName
        username
        userType
        email
        password
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
        residence {
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
          firstName
          lastName
          username
          userType
          email
          password
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
          firstName
          lastName
          username
          userType
          email
          password
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
          firstName
          lastName
          username
          userType
          email
          password
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
