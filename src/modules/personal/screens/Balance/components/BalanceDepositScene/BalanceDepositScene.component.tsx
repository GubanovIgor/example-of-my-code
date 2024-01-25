import React, { Suspense, useState } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TEXT_VARIANTS } from 'config/theme';
import { LoadingView } from 'components/LoadingView';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { BalanceDepositSceneQuery } from 'queries/__generated__/BalanceDepositSceneQuery.graphql';
import { useTranslation } from 'react-i18next';
import {
  ExternalKycVerificationStatus,
  PaymentHandlerOperationType,
} from 'queries/__generated__/UserAccountQuery.graphql';
import { DepositMethodItem_fragment$key } from 'queries/__generated__/DepositMethodItem_fragment.graphql';
import { PaymentHandlerForm } from 'components/PaymentHandlerForm';
import { PaymentHandlerForm_fragment$key } from 'queries/__generated__/PaymentHandlerForm_fragment.graphql';
import { PaymentFormScreenMutation } from 'queries/__generated__/PaymentFormScreenMutation.graphql';
import { useUtilsStore } from 'store/utilsStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { showToast } from 'core/utils';

import { PATHS } from 'constants/PATHS';

import { PaymentFormMutation } from '../DepositPayment/PaymentFormScreen.container';
import { BalanceContactUsNotice } from '../BalanceContactUsNotice';
import { PaymentHandlersList } from '../PaymentHandlersList';
import { styles } from './BalanceDepositScene.styles';

interface Props {
  stylesProp?: StyleProp<ViewStyle>;
  allowedOperationTypes?: readonly PaymentHandlerOperationType[];
  kycStatus?: ExternalKycVerificationStatus;
  refreshedQueryOptions?: LazyLoadQueryOptions;
}

export interface DepositMethod {
  title: string;
  icon: JSX.Element;
}

const query = graphql`
  query BalanceDepositSceneQuery {
    paymentHandlersV2(type: DEPOSIT) {
      items {
        id
        ...DepositMethodItem_fragment
        ...PaymentHandlerForm_fragment
      }
    }
  }
`;

const PAYMENT_FORM_HEIGHT = 90;

export const BalanceDepositSceneSuspenseWrapper = (props: Props) => (
  <Suspense fallback={<LoadingView />}>
    <BalanceDepositScene {...props} />
  </Suspense>
);

export const BalanceDepositScene = ({
  stylesProp,
  allowedOperationTypes,
  refreshedQueryOptions,
  kycStatus,
}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();
  const [row, setRow] = useState(0);

  const [paymentMethodRef, setPaymentMethodRef] =
    useState<PaymentHandlerForm_fragment$key | null>(null);

  //@ts-ignore
  const paymentMethodId = paymentMethodRef?.id;

  const { paymentHandlersV2 } = useLazyLoadQuery<BalanceDepositSceneQuery>(
    query,
    {},
    refreshedQueryOptions,
  );

  const { setCustomModalData } = useUtilsStore();

  const [commit, loading] =
    useMutation<PaymentFormScreenMutation>(PaymentFormMutation);

  const getOnMethodPressHandler =
    (ref: DepositMethodItem_fragment$key, index: number) => () => {
      setRow(Math.ceil((index + 1) / 3));
      //@ts-ignore
      setPaymentMethodRef(ref);
    };

  const onSubmit = (
    values: Record<string, string | { value: string }>,
  ): void => {
    const input = Object.entries(values).map(([key, value]) => ({
      key: key,
      value: typeof value === 'object' ? String(value.value) : String(value),
    }));

    commit({
      variables: {
        input,
        id: paymentMethodId,
      },
      onCompleted: (response) => {
        if (!response.proceedToPayment.redirectUrl) {
          setCustomModalData({
            isVisible: true,
            type: 'error',
            message: t('SOMETHING_WENT_WRONG'),
          });

          return;
        }

        navigation.navigate(PATHS.WEB_VIEW, {
          uri: response.proceedToPayment.redirectUrl,
        });
      },
      onError: (error) => {
        showToast(error?.message || t('SOMETHING_WENT_WRONG'), true);
      },
    });
  };

  return (
    <>
      <View style={[styles.container, stylesProp]}>
        <Text style={TEXT_VARIANTS.font14}>{t('SELECT_DEPOSIT_METHOD')}</Text>
        <PaymentHandlersList
          customItemBottomComponent={
            <View
              style={[
                styles.paymentHandlerFormContainer,
                { top: PAYMENT_FORM_HEIGHT * row },
              ]}
            >
              <PaymentHandlerForm
                onSubmit={onSubmit}
                isOnSubmitLoading={loading}
                paymentMethodRef={paymentMethodRef}
              />
            </View>
          }
          getOnMethodPressHandler={getOnMethodPressHandler}
          paymentHandlers={paymentHandlersV2}
          paymentMethodId={paymentMethodId}
        />
      </View>
      {kycStatus === 'APPROVED' &&
        !allowedOperationTypes?.includes('DEPOSIT') && (
          <BalanceContactUsNotice t={t} />
        )}
    </>
  );
};
