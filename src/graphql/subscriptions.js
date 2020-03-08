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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff {
    onCreateStaff {
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
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff {
    onUpdateStaff {
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
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff {
    onDeleteStaff {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateClientRecord = /* GraphQL */ `
  subscription OnCreateClientRecord {
    onCreateClientRecord {
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
export const onUpdateClientRecord = /* GraphQL */ `
  subscription OnUpdateClientRecord {
    onUpdateClientRecord {
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
export const onDeleteClientRecord = /* GraphQL */ `
  subscription OnDeleteClientRecord {
    onDeleteClientRecord {
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
export const onCreatePermission = /* GraphQL */ `
  subscription OnCreatePermission {
    onCreatePermission {
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
export const onUpdatePermission = /* GraphQL */ `
  subscription OnUpdatePermission {
    onUpdatePermission {
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
export const onDeletePermission = /* GraphQL */ `
  subscription OnDeletePermission {
    onDeletePermission {
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
