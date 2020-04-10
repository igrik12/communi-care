import { API, graphqlOperation, Auth } from 'aws-amplify';
import { onUpdateClientRecord } from 'graphql/subscriptions';

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const clientRecordUpdateSubscribe = (action) => {
  const subscription = API.graphql(graphqlOperation(onUpdateClientRecord)).subscribe({
    next: async (companyData) => await action(companyData),
  });
  return subscription;
};
