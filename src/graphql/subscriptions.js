/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff {
    onCreateStaff {
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
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff {
    onUpdateStaff {
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
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff {
    onDeleteStaff {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateResidency = /* GraphQL */ `
  subscription OnCreateResidency {
    onCreateResidency {
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
export const onUpdateResidency = /* GraphQL */ `
  subscription OnUpdateResidency {
    onUpdateResidency {
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
export const onDeleteResidency = /* GraphQL */ `
  subscription OnDeleteResidency {
    onDeleteResidency {
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
export const onCreateAddress = /* GraphQL */ `
  subscription OnCreateAddress {
    onCreateAddress {
      firstLine
      county
      postCode
    }
  }
`;
export const onUpdateAddress = /* GraphQL */ `
  subscription OnUpdateAddress {
    onUpdateAddress {
      firstLine
      county
      postCode
    }
  }
`;
export const onDeleteAddress = /* GraphQL */ `
  subscription OnDeleteAddress {
    onDeleteAddress {
      firstLine
      county
      postCode
    }
  }
`;
export const onCreateClientRecord = /* GraphQL */ `
  subscription OnCreateClientRecord {
    onCreateClientRecord {
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
export const onUpdateClientRecord = /* GraphQL */ `
  subscription OnUpdateClientRecord {
    onUpdateClientRecord {
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
export const onDeleteClientRecord = /* GraphQL */ `
  subscription OnDeleteClientRecord {
    onDeleteClientRecord {
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
export const onCreateEntry = /* GraphQL */ `
  subscription OnCreateEntry {
    onCreateEntry {
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
export const onUpdateEntry = /* GraphQL */ `
  subscription OnUpdateEntry {
    onUpdateEntry {
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
export const onDeleteEntry = /* GraphQL */ `
  subscription OnDeleteEntry {
    onDeleteEntry {
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
export const onCreatePermission = /* GraphQL */ `
  subscription OnCreatePermission {
    onCreatePermission {
      title
      value
    }
  }
`;
export const onUpdatePermission = /* GraphQL */ `
  subscription OnUpdatePermission {
    onUpdatePermission {
      title
      value
    }
  }
`;
export const onDeletePermission = /* GraphQL */ `
  subscription OnDeletePermission {
    onDeletePermission {
      title
      value
    }
  }
`;
