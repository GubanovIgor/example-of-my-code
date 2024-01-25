import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadArgs, VoidFunction } from 'core/interfaces';
import {
  ResultsScreenQuery,
  ResultsScreenQuery$variables,
} from 'queries/__generated__/ResultsScreenQuery.graphql';
import React, { FC, Suspense, useState } from 'react';
import { useLazyLoadQuery, fetchQuery } from 'react-relay';
import { getClientEnvironment } from 'relay/index';

import { ResultsPresenter } from './Results.presenter';
import { ResultsQuery } from './Results.queries';

interface Props {
  queryArgs: LazyLoadArgs<any>;
  onRefresh: VoidFunction;
  isRefreshing: boolean;
}

export const ResultsSuspenseWrapper = () => {
  const [queryArgs, setQueryArgs] = useState<
    LazyLoadArgs<ResultsScreenQuery$variables>
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
      variables: {},
    }));
  };

  const onRefresh = () => {
    if (isRefreshing) {
      return;
    }
    setIsRefreshing(true);

    fetchQuery(getClientEnvironment(), ResultsQuery, {}).subscribe({
      complete: () => {
        setIsRefreshing(false);

        setQueryArgs((prev) => ({
          options: {
            fetchKey: Number(prev?.options?.fetchKey || 0) + 1,
            fetchPolicy: 'store-only',
          },
          variables: {},
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
          <ResultsContainer
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            queryArgs={queryArgs}
          />
        </Suspense>
      </CustomErrorBoundary>
    </>
  );
};

export const ResultsContainer: FC<Props> = ({
  onRefresh,
  isRefreshing,
  queryArgs,
}) => {
  const resultsData = useLazyLoadQuery<ResultsScreenQuery>(
    ResultsQuery,
    queryArgs?.variables,
    queryArgs?.options,
  );

  return (
    <ResultsPresenter
      results={resultsData?.gamingResult}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};
