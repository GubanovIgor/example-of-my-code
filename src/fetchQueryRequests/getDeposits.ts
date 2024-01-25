import { AuthStoreQuery } from 'queries/__generated__/AuthStoreQuery.graphql';
import { fetchQuery } from 'react-relay';
import { AuthStoreQuery as Query } from 'core/queries';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';

export const getDeposits = (env: RelayModernEnvironment) =>
  fetchQuery<AuthStoreQuery>(env, Query, {}).toPromise();
