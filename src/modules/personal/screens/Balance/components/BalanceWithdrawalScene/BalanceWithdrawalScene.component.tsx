import React, { Suspense } from 'react';
import { Text, View } from 'react-native';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoadingView } from 'components/LoadingView';
import { BalanceWithdrawalSceneQuery } from 'queries/__generated__/BalanceWithdrawalSceneQuery.graphql';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from 'core/interfaces/navigation';
import { LazyLoadQueryOptions, VoidFunction } from 'core/interfaces';
import { DepositMethodItem_fragment$key } from 'queries/__generated__/DepositMethodItem_fragment.graphql';
import { BalanceDisplay } from 'components/BalanceDisplay';
import {
  ExternalKycVerificationStatus,
  PaymentHandlerOperationType,
} from 'queries/__generated__/UserAccountQuery.graphql';

import { PATHS } from 'constants/PATHS';

import { styles } from './BalanceWithdrawalScene.styles';
import { PaymentHandlersList } from '../PaymentHandlersList';
import { WithdrawalVerificationNoticeNotice } from '../WithdrawalVerificationNotice';

interface Props {
  allowedOperationTypes?: readonly PaymentHandlerOperationType[];
  isInitializingKYC: boolean;
  refreshedQueryOptions?: LazyLoadQueryOptions;
  kycStatus?: ExternalKycVerificationStatus;
  onPressVerify: VoidFunction;
}

const query = graphql`
  query BalanceWithdrawalSceneQuery {
    paymentHandlersV2(type: WITHDRAWAL) {
      items {
        id
        ...DepositMethodItem_fragment
      }
    }
  }
`;

export const BalanceWithdrawalSceneSuspenseWrapper = (props: Props) => (
  <Suspense fallback={<LoadingView />}>
    <BalanceWithdrawalScene {...props} />
  </Suspense>
);

export const BalanceWithdrawalScene = ({
  refreshedQueryOptions,
  allowedOperationTypes,
  isInitializingKYC,
  kycStatus,
  onPressVerify,
}: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { paymentHandlersV2 } = useLazyLoadQuery<BalanceWithdrawalSceneQuery>(
    query,
    {},
    refreshedQueryOptions,
  );

  const getOnSelectWithdrawalMethod =
    (paymentMethodRef: DepositMethodItem_fragment$key) => () => {
      navigation.navigate(PATHS.DEPOSIT_PAYMENT, {
        paymentMethodRef,
        paymentHandlerType: 'withdrawal',
      });
    };

  return (
    <>
      <View style={styles.container}>
        <Text style={[TEXT_VARIANTS.font14, { marginBottom: GUTTER_SIZE * 2 }]}>
          {t('AVAILABLE_FOR_WITHDRAW')}
        </Text>
        <BalanceDisplay type="withdrawal" />
        <Text style={[TEXT_VARIANTS.font14, { marginTop: GUTTER_SIZE * 8 }]}>
          {t('SELECT_DEPOSIT_METHOD')}
        </Text>
        <PaymentHandlersList
          paymentHandlers={paymentHandlersV2}
          getOnMethodPressHandler={getOnSelectWithdrawalMethod}
        />
        <View style={styles.attentionContainer}>
          <Text style={[TEXT_VARIANTS.font10, styles.attentionText]}>
            {t('PERIOD_TO_PAYOUT_5_DAYS')}
          </Text>
        </View>
      </View>
      {kycStatus === 'APPROVED' &&
        !allowedOperationTypes?.includes('WITHDRAWAL') && (
          <WithdrawalVerificationNoticeNotice
            isLoading={isInitializingKYC}
            onPressVerify={onPressVerify}
            t={t}
          />
        )}
    </>
  );
};
