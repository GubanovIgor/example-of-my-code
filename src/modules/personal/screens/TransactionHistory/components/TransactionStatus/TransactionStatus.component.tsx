import { TEXT_VARIANTS } from 'config/theme';
import { PaymentTransactionState } from 'queries/__generated__/TransactionHistoryItem_fragment.graphql';
import React, { FC, memo } from 'react';
import { Text, View } from 'react-native';
import { GetTranslationValue } from 'core/interfaces';

import { styles } from './TransactionStatus.styles';

interface TransactionStatusProps {
  status: PaymentTransactionState;
  t: GetTranslationValue;
}

const getStatusTitleAndStyles = (
  status: PaymentTransactionState,
  t: GetTranslationValue,
) => {
  switch (status) {
    case 'SUCCESSFUL':
    case 'CAPTURED':
      return {
        title: t('TRANSACTION_HISTORY_STATUSES.ACCEPTED'),
        styles: styles.acceptedContainer,
      };
    case 'BK_REFUSED':
    case 'ROLLEDBACK':
    case 'FAILED':
      return {
        title: t('TRANSACTION_HISTORY_STATUSES.REJECTED'),
        styles: styles.rejectedContainer,
      };
    case 'PENDING':
    case 'BK_REPORT':
    case 'BK_APPROVED':
    case 'MERCHANT_APPROVAL':
    case 'CAPTURE_PENDING':
    case 'SPECIAL_PROVIDER_STATE':
    case 'MUST_ROLLBACK':
    case 'NEW':
    case 'PREPARED':
    case 'UNDEFINED':
      return {
        title: t('TRANSACTION_HISTORY_STATUSES.IN_PROCESS'),
        styles: styles.pendingContainer,
      };

    default:
      return { title: '', styles: styles.hideContainer };
  }
};

export const TransactionStatus: FC<TransactionStatusProps> = memo(
  ({ status, t }) => {
    const statusNameAndStyles = getStatusTitleAndStyles(status, t);

    return (
      <View style={[styles.container, statusNameAndStyles.styles]}>
        <Text style={[TEXT_VARIANTS.font10, styles.status]}>
          {statusNameAndStyles.title}
        </Text>
      </View>
    );
  },
);
