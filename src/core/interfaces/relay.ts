import { CacheConfig, FetchPolicy, RenderPolicy } from 'relay-runtime';

export interface LazyLoadQueryOptions {
  fetchKey?: string | number | undefined;
  fetchPolicy?: FetchPolicy | undefined;
  networkCacheConfig?: CacheConfig | undefined;
  UNSTABLE_renderPolicy?: RenderPolicy | undefined;
}

type Variables<T> = T;
export interface LazyLoadArgs<T> {
  options?: LazyLoadQueryOptions;
  variables: Variables<T>;
}
