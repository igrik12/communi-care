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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff {
    onCreateStaff {
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
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff {
    onUpdateStaff {
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
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff {
    onDeleteStaff {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateClientRecord = /* GraphQL */ `
  subscription OnCreateClientRecord {
    onCreateClientRecord {
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
export const onUpdateClientRecord = /* GraphQL */ `
  subscription OnUpdateClientRecord {
    onUpdateClientRecord {
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
export const onDeleteClientRecord = /* GraphQL */ `
  subscription OnDeleteClientRecord {
    onDeleteClientRecord {
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
