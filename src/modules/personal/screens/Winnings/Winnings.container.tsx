import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { SubHeader } from 'components/SubHeader';
import { LazyLoadArgs } from 'core/interfaces';
import { WinningsScreenItemsFragment$key } from 'queries/__generated__/WinningsScreenItemsFragment.graphql';
import {
  WinningsScreenItemsQuery,
  WinningsScreenItemsQuery$variables,
} from 'queries/__generated__/WinningsScreenItemsQuery.graphql';
import React, { FC, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useLazyLoadQuery,
  usePaginationFragment,
  fetchQuery,
} from 'react-relay';
import { getClientEnvironment } from 'relay/index';

import { WinningsPresenter } from './Winnings.presenter';
import {
  WinningsQuery,
  WinningsScreenPaginationQuery,
} from './Winnings.queries';

const FIRST_TO_FETCH = 10;

export interface WinningsContainerProps {
  queryArgs: LazyLoadArgs<any>;
  onRefetchPagination: () => void;
  isRefetchingPagination: boolean;
}

export const WinningsSuspenseWrapper = () => {
  const [queryArgs, setQueryArgs] = useState<
    LazyLoadArgs<WinningsScreenItemsQuery$variables>
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

    fetchQuery(getClientEnvironment(), WinningsQuery, {
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
          <SubHeader isBackButton title="My winnings" />
          <WinningsContainer
            onRefetchPagination={onRefreshPagination}
            isRefetchingPagination={isRefreshing}
            queryArgs={queryArgs}
          />
        </Suspense>
      </CustomErrorBoundary>
    </>
  );
};

export const WinningsContainer: FC<WinningsContainerProps> = ({
  onRefetchPagination,
  isRefetchingPagination,
  queryArgs,
}) => {
  const { t } = useTranslation();
  const betHistoryData = useLazyLoadQuery<WinningsScreenItemsQuery>(
    WinningsQuery,
    queryArgs?.variables,
    queryArgs?.options,
  );

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<
    WinningsScreenItemsQuery,
    WinningsScreenItemsFragment$key
  >(WinningsScreenPaginationQuery, betHistoryData);

  const winnings = useMemo(
    () => data?.winningHistoryCursor?.edges?.map((edge) => edge.node),
    [data],
  );

  const onLoadNext = () => {
    if (!hasNext) return;
    loadNext(FIRST_TO_FETCH);
  };

  return (
    <WinningsPresenter
      t={t}
      winnings={winnings}
      onLoadNext={onLoadNext}
      onRefetch={onRefetchPagination}
      isRefetching={isRefetchingPagination}
      isLoadingNext={isLoadingNext}
    />
  );
};
