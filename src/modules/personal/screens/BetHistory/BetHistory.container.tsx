import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadArgs } from 'core/interfaces';
import { RootStackParamList } from 'core/interfaces/navigation';
import { BetHistoryScreenItemsFragment$key } from 'queries/__generated__/BetHistoryScreenItemsFragment.graphql';
import {
  BetHistoryScreenItemsQuery,
  BetHistoryScreenItemsQuery$variables,
} from 'queries/__generated__/BetHistoryScreenItemsQuery.graphql';
import React, { FC, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchQuery,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import { getClientEnvironment } from 'relay/index';

import { PATHS } from 'constants/PATHS';

import { BetHistoryPresenter } from './BetHistory.presenter';
import {
  BetHistoryQuery,
  BetHistoryScreenPaginationQuery,
} from './BetHistory.queries';
import { BetHistoryContainerProps } from './BetHistory.types';

const FIRST_TO_FETCH = 10;

export const BetHistorySuspenseWrapper = () => {
  const [queryArgs, setQueryArgs] = useState<
    LazyLoadArgs<BetHistoryScreenItemsQuery$variables>
  >({
    options: { fetchKey: 0 },
    variables: {},
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefreshBoundary = () => {
    setQueryArgs((prev) => ({
      options: {
        fetchKey: Number(prev?.options?.fetchKey || 0) + 1,
        fetchPolicy: 'store-and-network',
      },
      variables: { first: 5 },
    }));
  };

  const onRefreshPagination = () => {
    if (isRefreshing) {
      return;
    }
    setIsRefreshing(true);

    fetchQuery(getClientEnvironment(), BetHistoryQuery, {
      first: FIRST_TO_FETCH,
    }).subscribe({
      complete: () => {
        setIsRefreshing(false);

        setQueryArgs((prev) => ({
          options: {
            fetchKey: Number(prev?.options?.fetchKey || 0) + 1,
            fetchPolicy: 'store-only',
          },
          variables: { first: FIRST_TO_FETCH },
        }));
      },
      error: () => {
        setIsRefreshing(false);
      },
    });
  };

  return (
    <>
      <CustomErrorBoundary onRefresh={onRefreshBoundary}>
        <Suspense fallback={<LoadingView />}>
          <BetHistoryContainer
            onRefetchPagination={onRefreshPagination}
            isRefetchingPagination={isRefreshing}
            queryArgs={queryArgs}
          />
        </Suspense>
      </CustomErrorBoundary>
    </>
  );
};

export const BetHistoryContainer: FC<BetHistoryContainerProps> = ({
  queryArgs,
  onRefetchPagination,
  isRefetchingPagination,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();
  const betHistoryData = useLazyLoadQuery<BetHistoryScreenItemsQuery>(
    BetHistoryQuery,
    queryArgs?.variables,
    queryArgs?.options,
  );

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    BetHistoryScreenItemsQuery,
    BetHistoryScreenItemsFragment$key
  >(BetHistoryScreenPaginationQuery, betHistoryData);

  const betHistory = useMemo(
    () => data?.gamingHistoryCursor?.edges?.map((edge) => edge.node),
    [data],
  );

  const onLoadNext = () => {
    if (!hasNext) return;
    loadNext(FIRST_TO_FETCH);
  };

  const handlePressGoPopular = () => {
    //@ts-ignore
    navigation.navigate(PATHS.HOME);
  };

  return (
    <BetHistoryPresenter
      t={t}
      onPressGoPopular={handlePressGoPopular}
      isRefetching={isRefetchingPagination}
      onLoadNext={onLoadNext}
      betHistory={betHistory}
      isLoadingNext={isLoadingNext}
      onRefetch={onRefetchPagination}
    />
  );
};
