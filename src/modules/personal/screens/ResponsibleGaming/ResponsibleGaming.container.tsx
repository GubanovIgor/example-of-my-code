import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LoadingView } from 'components/LoadingView';
import { LockDurationEnum } from 'core/enums/selfLimits';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { LimitType } from 'queries/__generated__/ResponsibleGamingLimitsMutation.graphql';
import { ResponsibleGamingScreenQuery } from 'queries/__generated__/ResponsibleGamingScreenQuery.graphql';
import React, { FC, Suspense, useCallback, useEffect, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay';

import { useResponsbileGamingCases } from './hooks';
import { ResponsibleGamingPresenter } from './ResponsibleGaming.presenter';
import { ResponsibleGamingQuery } from './ResponsibleGaming.queries';
import { SelfLimits } from './ResponsibleGaming.types';

interface ContainerProps {
  queryOptions?: LazyLoadQueryOptions;
}

export const ResponsibleGamingSuspenseWrapper = () => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  return (
    <Suspense fallback={<LoadingView />}>
      <CustomErrorBoundary onRefresh={onRefresh}>
        <ResponsibleGamingContainer queryOptions={refreshedQueryOptions} />
      </CustomErrorBoundary>
    </Suspense>
  );
};

export const ResponsibleGamingContainer: FC<ContainerProps> = ({
  queryOptions,
}) => {
  const [selfLimits, setSelfLimits] = useState<SelfLimits>();

  const limitsData = useLazyLoadQuery<ResponsibleGamingScreenQuery>(
    ResponsibleGamingQuery,
    {},
    queryOptions,
  );

  const {
    handleSaveMaxLimit,
    handleSaveTrioLimits,
    handleLockUser,
    isSavingMaxLimit,
    isSaveTrioLimitsLoading,
    isLockingUser,
  } = useResponsbileGamingCases();

  useEffect(() => {
    if (!limitsData || selfLimits) return;

    setSelfLimits(limitsData.selfLimits);
  }, [limitsData, selfLimits]);

  const handleSaveLimits = useCallback(
    (data: any, type?: LimitType) => {
      if (!type) {
        return handleSaveMaxLimit(data, setSelfLimits);
      }

      handleSaveTrioLimits({ type, trioLimits: data }, setSelfLimits);
    },
    [handleSaveMaxLimit, handleSaveTrioLimits],
  );

  const handlePressLock = useCallback(
    (value: LockDurationEnum) => {
      handleLockUser({ lockDurationType: value });
    },
    [handleLockUser],
  );

  return (
    <ResponsibleGamingPresenter
      onPressLock={handlePressLock}
      isSaveTrioLimitsLoading={isSaveTrioLimitsLoading}
      isSavingMaxLimit={isSavingMaxLimit}
      isLockingUser={isLockingUser}
      onSaveLimits={handleSaveLimits}
      selfLimits={selfLimits}
      currencySymbol={limitsData?.userCurrency?.symbol}
      userFirstName={limitsData?.userProfile?.profile?.firstName}
    />
  );
};
