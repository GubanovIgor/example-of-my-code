import React, { FC, useEffect, useState } from 'react';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { useUserStore } from 'store/userStore';
import { KYSService } from 'core/services';
import { useAuthStore } from 'store/authStore';

import { PATHS } from 'constants/PATHS';

import { BalancePresenter } from './Balance.presenter';

export const BalanceContainer: FC = () => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isInitializingKYC, setIsInitializingKYC] = useState(false);

  const { userAccountRef, getUserAccount } = useUserStore((state) => state);
  const { isFirstDeposit } = useAuthStore((state) => state.depositState);

  useEffect(() => {
    getUserAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  const handlePressVerify = () => {
    setIsInitializingKYC(true);
    KYSService.init({ setLoading: setIsInitializingKYC });
  };

  return (
    <BottomSheetWrapper
      screenKey={PATHS.BALANCE}
      isFirstDeposit={isFirstDeposit && sceneIndex === 0}
    >
      <CustomErrorBoundary onRefresh={onRefresh}>
        <BalancePresenter
          setSceneIndex={setSceneIndex}
          sceneIndex={sceneIndex}
          isInitializingKYC={isInitializingKYC}
          onPressVerify={handlePressVerify}
          userProfileData={userAccountRef}
          refreshedQueryOptions={refreshedQueryOptions}
        />
      </CustomErrorBoundary>
    </BottomSheetWrapper>
  );
};
