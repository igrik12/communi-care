import { API, graphqlOperation } from 'aws-amplify';
import { onUpdateClientRecord } from 'graphql/subscriptions';
import { ON_UPDATE_RECORD } from 'utils/constants';

/**
 *
 * @param {function} action called upon subsription trigger
 */
export const recordUpdateSubscribe = action => {
  const subscription = API.graphql(graphqlOperation(onUpdateClientRecord)).subscribe({
    next: recordData => action(recordData)
  });
  return subscription;
};

export const subscribeReports = subscriptions => {
  const subs = [];
  subscriptions.forEach(subscription => {
    const { type, action } = subscription;
    switch (type) {
      case ON_UPDATE_RECORD:
        subs.push(recordUpdateSubscribe(action));
        break;
      default:
        break;
    }
  });
  return subs;
};
