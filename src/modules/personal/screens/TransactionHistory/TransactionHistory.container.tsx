import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadArgs } from 'core/interfaces';
import { RootStackParamList } from 'core/interfaces/navigation';
import { TransactionHistoryScreenItemsFragment$key } from 'queries/__generated__/TransactionHistoryScreenItemsFragment.graphql';
import {
  TransactionHistoryScreenItemsQuery,
  TransactionHistoryScreenItemsQuery$variables,
} from 'queries/__generated__/TransactionHistoryScreenItemsQuery.graphql';
import React, { FC, Suspense, useMemo, useState } from 'react';
import {
  fetchQuery,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import { getClientEnvironment } from 'relay/index';

import { PATHS } from 'constants/PATHS';

import { TransactionHistoryPresenter } from './TransactionHistory.presenter';
import {
  TransactionHistoryScreenPaginationQuery,
  TransactionsQuery,
} from './TransactionHistory.queries';
import { TransactionHistoryContainerProps } from './TransactionHistory.types';

const FIRST_TO_FETCH = 14;

export const TransactionHistorySuspenseWrapper = () => {
  const [queryArgs, setQueryArgs] = useState<
    LazyLoadArgs<TransactionHistoryScreenItemsQuery$variables>
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
      variables: { first: FIRST_TO_FETCH },
    }));
  };

  const onRefreshPagination = () => {
    if (isRefreshing) {
      return;
    }
    setIsRefreshing(true);

    // fetchQuery will fetch the query and write
    // the data to the Relay store. This will ensure
    // that when we re-render, the data is already
    // cached and we don't suspend
    fetchQuery(getClientEnvironment(), TransactionsQuery, {
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
          <TransactionHistoryContainer
            onRefetchPagination={onRefreshPagination}
            isRefetchingPagination={isRefreshing}
            queryArgs={queryArgs}
          />
        </Suspense>
      </CustomErrorBoundary>
    </>
  );
};

export const TransactionHistoryContainer: FC<
  TransactionHistoryContainerProps
> = ({ queryArgs, onRefetchPagination, isRefetchingPagination }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const transactionsData = useLazyLoadQuery<TransactionHistoryScreenItemsQuery>(
    TransactionsQuery,
    queryArgs?.variables,
    queryArgs?.options,
  );

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    TransactionHistoryScreenItemsQuery,
    TransactionHistoryScreenItemsFragment$key
  >(TransactionHistoryScreenPaginationQuery, transactionsData);

  const transactions = useMemo(
    () => data?.paymentsHistory?.edges?.map((edge) => edge.node),
    [data],
  );

  const onLoadNext = () => {
    if (!hasNext) return;
    loadNext(FIRST_TO_FETCH);
  };

  const onPressDeposit = () => {
    navigation.navigate(PATHS.BALANCE);
  };

  return (
    <TransactionHistoryPresenter
      userCurrency={transactionsData?.userCurrency}
      isRefetching={isRefetchingPagination}
      onLoadNext={onLoadNext}
      onPressDeposit={onPressDeposit}
      transactions={transactions}
      isLoadingNext={isLoadingNext}
      onRefetch={onRefetchPagination}
    />
  );
};
