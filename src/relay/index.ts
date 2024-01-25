import Config from 'react-native-config';
import {
  Environment,
  Network,
  Store,
  RecordSource,
  Observable,
  FetchFunction,
  PayloadData,
  Variables,
  CacheConfig,
  GraphQLResponse,
  RequestParameters,
  MissingFieldHandler,
  ROOT_TYPE,
} from 'relay-runtime';
import { Sink } from 'relay-runtime/lib/network/RelayObservable';
import RelayQueryResponseCache from 'relay-runtime/lib/network/RelayQueryResponseCache';
import { Record } from 'relay-runtime/lib/store/RelayStoreTypes';

import { checkTokenExpiration } from '../core/utils';
import { refreshToken as getNewToken } from '../core/utils/refreshToken';
import { useAuthStore } from '../store/authStore';

const API_URL = String(Config.API_URL);
const ONE_HOUR = 60 * 60 * 1000;
const cache = new RelayQueryResponseCache({ size: 250, ttl: ONE_HOUR });

const missingFieldHandlers: MissingFieldHandler[] = [
  {
    handle(
      field: { name: string },
      record: Record | null | undefined,
      argValues: Variables,
    ): string | undefined {
      if (
        record != null &&
        record.__typename === ROOT_TYPE &&
        field.name === 'paymentHandlerV2' &&
        argValues.hasOwnProperty('id')
      ) {
        // If field is paymentHandlerV2(id: $id), look up the record by the value of $id
        return argValues.id;
      }

      return undefined;
    },
    kind: 'linked',
  },
];

//We need it because we have to save promise while we are updating token, so multiple requests for identity will not be called
let refreshTokenPromise: Promise<string> | null = null;

// Keep in mind: callback param to Network.create runs every time request to graphql endpoint is made!
export const createClientNetwork = (): ReturnType<typeof Network.create> =>
  Network.create(executeFunction);

let clientEnv: Environment | undefined;
export function getClientEnvironment(): Environment {
  if (!clientEnv) {
    clientEnv = new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource()),
      isServer: false,
      missingFieldHandlers,
    });
  }

  return clientEnv;
}

const customFetch = async (
  params: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
  sink: Sink<GraphQLResponse>,
) => {
  const queryID = params.text;
  const isMutation = params.operationKind === 'mutation';
  const isQuery = params.operationKind === 'query';
  const forceFetch = cacheConfig?.force;

  const fromCache = queryID ? cache.get(queryID, variables) : null;

  if (isQuery && fromCache !== null && !forceFetch) {
    // Return data from cache and continue
    sink.next(fromCache);
  }

  let { accessToken, refreshToken } = useAuthStore.getState().loginState;
  const token = await handleTokenRefresh(accessToken, refreshToken);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-invalidate-token-cache': 'token',
      Authorization: `Bearer ${token || ''}`,
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const data = (await response.json()) as {
    data?: PayloadData;
    errors: Error[];
  };

  if (isMutation && data.errors) {
    sink.error(data.errors[0]);
    sink.complete();

    return;
  }

  // Set cache
  if (isQuery && data && queryID) {
    cache.set(queryID, variables, data);
  }

  sink.next(data);
  sink.complete();
};

const executeFunction: FetchFunction = (request, variables, cacheConfig) =>
  Observable.create((sink) => {
    customFetch(request, variables, cacheConfig, sink);
  });

const handleTokenRefresh = async (
  inputToken: string,
  cookieRefresh: string,
) => {
  let token = inputToken;

  if (checkTokenExpiration(token) && !refreshTokenPromise) {
    refreshTokenPromise = getNewToken(cookieRefresh)
      .then((res) => {
        const { accessToken, refreshToken } = res;
        useAuthStore.getState().setLogin(accessToken, refreshToken);
        refreshTokenPromise = null;
        return accessToken;
      })
      .catch(() => {
        refreshTokenPromise = null;
        useAuthStore.getState().logout();
        return '';
      });

    token = await refreshTokenPromise;
  }
  return token;
};
