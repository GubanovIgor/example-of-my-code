import { PaymentHandlerForm } from 'components/PaymentHandlerForm';
import { GUTTER_SIZE } from 'config/theme';
import { PaymentHandlerForm_fragment$key } from 'queries/__generated__/PaymentHandlerForm_fragment.graphql';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {
  paymentMethodRef: PaymentHandlerForm_fragment$key | null;
  onSubmit: (values: Record<string, string | { value: string }>) => void;
  isOnSubmitLoading: boolean;
  balance?: number;
}

export const PaymentFormScreenPresenter = ({
  paymentMethodRef,
  onSubmit,
  balance,
  isOnSubmitLoading,
}: Props) => (
  <ScrollView contentContainerStyle={styles.container}>
    <PaymentHandlerForm
      balance={balance}
      paymentMethodRef={paymentMethodRef}
      onSubmit={onSubmit}
      isOnSubmitLoading={isOnSubmitLoading}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GUTTER_SIZE * 3,
  },
});
