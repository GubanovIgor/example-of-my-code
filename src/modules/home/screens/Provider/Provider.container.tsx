import React, { FC, Suspense, useState } from 'react';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { RootStackScreenProps } from 'core/interfaces/navigation';
import { ProviderScreenQuery } from 'queries/__generated__/ProviderScreenQuery.graphql';
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import { SubHeader } from 'components/SubHeader';
import { GamesListPaginationQuery } from 'queries/__generated__/GamesListPaginationQuery.graphql';
import { ProviderScreenGamesFragment$key } from 'queries/__generated__/ProviderScreenGamesFragment.graphql';
import { getNormalizedPaginationData } from 'core/helpers';
import { useTranslation } from 'react-i18next';

import { PATHS } from 'constants/PATHS';

import { ProviderPresenter } from './Provider.presenter';
import { DEFAULT_FETCH_COUNT } from './Provider.constants';

interface ProviderContainerProps extends RootStackScreenProps<PATHS.PROVIDER> {
  queryOptions?: LazyLoadQueryOptions;
}

const Query = graphql`
  query ProviderScreenQuery(
    $first: Int
    $after: String
    $providerName: String
  ) {
    providers: gameProvidersByFilter(take: 30) {
      items {
        ...ProvidersListItem_fragment
      }
    }
    ...ProviderScreenGamesFragment
  }
`;

export const PaginationQuery = graphql`
  fragment ProviderScreenGamesFragment on Query
  @refetchable(queryName: "GamesListPaginationQuery") {
    gamesByFilterCursor(
      first: $first
      after: $after
      providerName: $providerName
    ) @connection(key: "ProviderScreenGamesFragment__gamesByFilterCursor") {
      edges {
        cursor
        node {
          ...HomeGameCard_fragment
        }
      }
    }
  }
`;

export const ProviderSuspenseWrapper = (
  props: RootStackScreenProps<PATHS.PROVIDER>,
) => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  //TODO: Uncomment this for future work when backend will be ready
  // const handlePressOpenSorting = () => {};

  return (
    <>
      <SubHeader
        shouldUseInsets={false}
        title={props?.route?.params?.providerName}
        isBackButton
      />
      <Suspense fallback={<LoadingView />}>
        {/* TODO: Uncomment this for future work when backend will be ready
      <CustomPicker chosenOption={} onPress={handlePressOpenSorting} />
      */}
        <CustomErrorBoundary onRefresh={onRefresh}>
          <ProviderContainer {...props} queryOptions={refreshedQueryOptions} />
        </CustomErrorBoundary>
      </Suspense>
    </>
  );
};

export const ProviderContainer: FC<ProviderContainerProps> = ({
  queryOptions,
  route,
}) => {
  const { providerName } = route?.params || {};

  const { t } = useTranslation();
  const gamesData = useLazyLoadQuery<ProviderScreenQuery>(
    Query,
    { first: DEFAULT_FETCH_COUNT, providerName },
    queryOptions,
  );

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    GamesListPaginationQuery,
    ProviderScreenGamesFragment$key
  >(PaginationQuery, gamesData);

  const handleOnLoadMore = () => {
    if (!hasNext) return;

    loadNext(DEFAULT_FETCH_COUNT);
  };

  const games = getNormalizedPaginationData<'HomeGameCard_fragment'>(
    data.gamesByFilterCursor?.edges,
  );

  const providers = gamesData?.providers?.items?.slice(-5);

  return (
    <ProviderPresenter
      t={t}
      onEndReached={handleOnLoadMore}
      isLoadingNext={isLoadingNext}
      providers={providers}
      games={games}
    />
  );
};
