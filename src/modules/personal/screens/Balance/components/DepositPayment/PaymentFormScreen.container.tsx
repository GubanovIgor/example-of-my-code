import React, { FC, Suspense, useState } from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { PaymentFormScreenQuery } from 'queries/__generated__/PaymentFormScreenQuery.graphql';
import { PaymentFormScreenMutation } from 'queries/__generated__/PaymentFormScreenMutation.graphql';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'core/interfaces/navigation';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { useUtilsStore } from 'store/utilsStore';
import { useTranslation } from 'react-i18next';
import { useUserStore } from 'store/userStore';
import { LoadingView } from 'components/LoadingView';
import { showToast } from 'core/utils';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';

import { PATHS } from 'constants/PATHS';

import { PaymentFormScreenPresenter } from './PaymentFormScreen.presenter';

const query = graphql`
  query PaymentFormScreenQuery($id: ID!) {
    node(id: $id) {
      ... on PaymentHandlerV2 {
        id
        ...DepositMethodItem_fragment
        ...PaymentHandlerForm_fragment
      }
    }
  }
`;

export const PaymentFormMutation = graphql`
  mutation PaymentFormScreenMutation(
    $input: [KeyValuePairOfStringAndStringInput!]!
    $id: ID!
  ) {
    proceedToPayment(paymentHandlerId: $id, parameters: $input) {
      id
      amount
      redirectUrl
      mainAccount {
        id
        balance
        blockedAmount
        currency {
          id
          shortSign
        }
      }
    }
  }
`;

interface PaymentFormContainerProps {
  queryOptions?: LazyLoadQueryOptions;
  route?: RouteProp<RootStackParamList, PATHS.DEPOSIT_PAYMENT>;
}

export const PaymentFormScreenSuspenseWrapper: FC<
  RootStackScreenProps<PATHS.DEPOSIT_PAYMENT>
> = (props) => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };
  return (
    <BottomSheetWrapper
      screenKey={PATHS.DEPOSIT_PAYMENT}
      title={props?.route?.params?.paymentHandlerType}
      isBackButton
    >
      <Suspense fallback={<LoadingView />}>
        <CustomErrorBoundary onRefresh={onRefresh}>
          <PaymentFormScreen
            route={props.route}
            queryOptions={refreshedQueryOptions}
          />
        </CustomErrorBoundary>
      </Suspense>
    </BottomSheetWrapper>
  );
};

export const PaymentFormScreen: FC<PaymentFormContainerProps> = ({
  route,
  queryOptions,
}) => {
  const { paymentMethodRef, paymentHandlerType } = route?.params || {};
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { setCustomModalData } = useUtilsStore((s) => s);

  //@ts-ignore
  const paymentMethodId = paymentMethodRef?.id;

  const data = useLazyLoadQuery<PaymentFormScreenQuery>(
    query,
    {
      id: paymentMethodId,
    },
    queryOptions,
  );

  const balance = useUserStore((state) => state.balance);

  const [commit, loading] =
    useMutation<PaymentFormScreenMutation>(PaymentFormMutation);

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
        if (paymentHandlerType === 'withdrawal') {
          navigation.navigate(PATHS.WITHDRAWAL_SUCCESS);
          return;
        }

        if (!response.proceedToPayment.redirectUrl) {
          setCustomModalData({
            isVisible: true,
            type: 'error',
            message: t('SOMETHING_WENT_WRONG'),
          });

          return;
        }

        if (paymentHandlerType === 'deposit') {
          navigation.navigate(PATHS.WEB_VIEW, {
            uri: response.proceedToPayment.redirectUrl,
          });
        }
      },
      onError: (error) => {
        showToast(error?.message || t('SOMETHING_WENT_WRONG'), true);
      },
    });
  };

  return (
    <PaymentFormScreenPresenter
      balance={paymentHandlerType === 'withdrawal' ? balance : undefined}
      paymentMethodRef={data.node}
      onSubmit={onSubmit}
      isOnSubmitLoading={loading}
    />
  );
};
