export const listClientRecordsWithClient = `
query listClientRecordsWithClient($filter: ModelClientRecordFilterInput, $limit: Int, $nextToken: String) {
  listClientRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
