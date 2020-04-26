/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff {
    onCreateStaff {
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
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff {
    onUpdateStaff {
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
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff {
    onDeleteStaff {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateResidence = /* GraphQL */ `
  subscription OnCreateResidence {
    onCreateResidence {
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
export const onUpdateResidence = /* GraphQL */ `
  subscription OnUpdateResidence {
    onUpdateResidence {
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
export const onDeleteResidence = /* GraphQL */ `
  subscription OnDeleteResidence {
    onDeleteResidence {
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
export const onCreateClientRecordArchived = /* GraphQL */ `
  subscription OnCreateClientRecordArchived {
    onCreateClientRecordArchived {
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
export const onUpdateClientRecordArchived = /* GraphQL */ `
  subscription OnUpdateClientRecordArchived {
    onUpdateClientRecordArchived {
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
export const onDeleteClientRecordArchived = /* GraphQL */ `
  subscription OnDeleteClientRecordArchived {
    onDeleteClientRecordArchived {
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
