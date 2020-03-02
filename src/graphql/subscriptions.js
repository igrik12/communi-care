/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff {
    onCreateStaff {
      id
      userName
      userType
      clientRecords {
        nextToken
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
        nextToken
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
        nextToken
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
        nextToken
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
        nextToken
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
export const onUpdateClientRecord = /* GraphQL */ `
  subscription OnUpdateClientRecord {
    onUpdateClientRecord {
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
export const onDeleteClientRecord = /* GraphQL */ `
  subscription OnDeleteClientRecord {
    onDeleteClientRecord {
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
        date
        status
        shift
        entryType
      }
    }
  }
`;
