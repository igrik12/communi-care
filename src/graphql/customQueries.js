export const listClientRecordsWithClient = `
query listClientRecordsWithClient($filter: ModelClientRecordFilterInput, $limit: Int, $nextToken: String) {
  listClientRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      shift
      entryType
      client {
        name
        id
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
