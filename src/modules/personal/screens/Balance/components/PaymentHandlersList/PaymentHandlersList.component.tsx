import { DepositMethodItem } from 'components/DepositMethodItem';
import { VoidFunction } from 'core/interfaces';
import { DepositMethodItem_fragment$key } from 'queries/__generated__/DepositMethodItem_fragment.graphql';
import React, { Fragment, ReactNode } from 'react';
import { View } from 'react-native';
import { FragmentRefs } from 'relay-runtime';

import { styles } from './PaymentHandlersList.styles';

interface Props {
  paymentMethodId?: string;
  customItemBottomComponent?: ReactNode;
  paymentHandlers: {
    readonly items:
      | readonly {
          readonly id: string;
          readonly ' $fragmentSpreads': FragmentRefs<'DepositMethodItem_fragment'>;
        }[]
      | null;
  } | null;
  getOnMethodPressHandler: (
    paymentMethodRef: DepositMethodItem_fragment$key,
    index: number,
  ) => VoidFunction;
}

const getDepositMethodItemRenderer =
  (
    onSelectPaymentHandler: (
      paymentMethodRef: DepositMethodItem_fragment$key,
      index: number,
    ) => VoidFunction,
    customItemBottomComponent: ReactNode,
    paymentMethodId?: string,
  ) =>
  (item: DepositMethodItem_fragment$key, index: number) => {
    //@ts-ignore
    const itemId = item.__id;

    const itemBottomMargin = itemId === paymentMethodId ? 220 : 0;

    const onPress = onSelectPaymentHandler(item, index);

    return (
      <Fragment key={itemId}>
        <View style={{ marginBottom: itemBottomMargin }}>
          <DepositMethodItem
            chosenMethodId={paymentMethodId}
            paymentMethodRef={item}
            key={itemId}
            onPress={onPress}
          />
        </View>

        {Boolean(paymentMethodId === itemId) && customItemBottomComponent}
      </Fragment>
    );
  };

export const PaymentHandlersList = ({
  paymentMethodId,
  paymentHandlers,
  customItemBottomComponent,
  getOnMethodPressHandler,
}: Props) => {
  const renderDepositMethodItem = getDepositMethodItemRenderer(
    getOnMethodPressHandler,
    customItemBottomComponent,
    paymentMethodId,
  );

  if (!paymentHandlers?.items?.length) {
    return <></>;
  }

  return (
    <View style={styles.depositMethodsContainer}>
      {paymentHandlers?.items.map(renderDepositMethodItem)}
    </View>
  );
};
