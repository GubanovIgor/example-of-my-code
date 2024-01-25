import React from 'react';
import { View } from 'react-native';
import { TabView } from 'components/TabView/TabView.component';
import {
  GetTranslationValue,
  LazyLoadQueryOptions,
  VoidFunction,
} from 'core/interfaces';
import { useTranslation } from 'react-i18next';
import { UserAccountQuery$data } from 'queries/__generated__/UserAccountQuery.graphql';

import { styles } from './Balance.styles';
import { BalanceDepositScene } from './components/BalanceDepositScene';
import { BalanceWithdrawalScene } from './components/BalanceWithdrawalScene';
import { BalanceContactUsNotice } from './components/BalanceContactUsNotice';
import { TransactionHistoryScreen } from '../TransactionHistory';

interface Props {
  refreshedQueryOptions?: LazyLoadQueryOptions;
  userProfileData: UserAccountQuery$data | null;
  isInitializingKYC: boolean;
  onPressVerify: VoidFunction;
  setSceneIndex: (index: number) => void;
  sceneIndex: number;
}

const getBalanceScreenTitles = (t: GetTranslationValue) => [
  { value: t('DEPOSIT'), key: 0 },
  { value: t('WITHDRAWAL'), key: 1 },
  { value: t('TRANSACTION_HISTORY'), key: 2 },
];

export const BalancePresenter = ({
  refreshedQueryOptions,
  userProfileData,
  isInitializingKYC,
  onPressVerify,
  setSceneIndex,
  sceneIndex,
}: Props) => {
  const { t } = useTranslation();
  const { externalKycVerificationStatus, userPaymentSettings } =
    userProfileData?.userProfile || {};

  const BALANCE_SCREEN_SCENES = [
    <BalanceDepositScene
      key={0}
      allowedOperationTypes={userPaymentSettings?.allowedOperationTypes}
      kycStatus={externalKycVerificationStatus}
      refreshedQueryOptions={refreshedQueryOptions}
    />,
    <BalanceWithdrawalScene
      key={1}
      allowedOperationTypes={userPaymentSettings?.allowedOperationTypes}
      isInitializingKYC={isInitializingKYC}
      kycStatus={externalKycVerificationStatus}
      refreshedQueryOptions={refreshedQueryOptions}
      onPressVerify={onPressVerify}
    />,
    <TransactionHistoryScreen key={2} />,
  ];

  return (
    <View style={styles.container}>
      <TabView
        setSceneIndex={setSceneIndex}
        sceneIndex={sceneIndex}
        titles={getBalanceScreenTitles(t)}
        scenes={BALANCE_SCREEN_SCENES}
      />
      {externalKycVerificationStatus !== 'APPROVED' && sceneIndex !== 2 && (
        <BalanceContactUsNotice t={t} />
      )}
    </View>
  );
};
