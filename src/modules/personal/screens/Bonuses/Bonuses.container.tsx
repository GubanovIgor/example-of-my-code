import React, { Suspense, useState } from 'react';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadQueryOptions } from 'core/interfaces';

import { BonusesPresenter } from './Bonuses.presenter';

export const BonusesContainer = () => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();
  const [sceneIndex, setSceneIndex] = useState(0);

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  return (
    <Suspense fallback={<LoadingView />}>
      <CustomErrorBoundary onRefresh={onRefresh}>
        <BonusesPresenter
          queryOptions={refreshedQueryOptions}
          setSceneIndex={setSceneIndex}
          sceneIndex={sceneIndex}
        />
      </CustomErrorBoundary>
    </Suspense>
  );
};
