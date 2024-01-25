import {
  PaymentTransactionType,
  TransactionHistoryItem_fragment$key,
} from 'queries/__generated__/TransactionHistoryItem_fragment.graphql';
import React, { FC, memo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFragment } from 'react-relay';
import WithDrawalIcon from 'assets/icons/withdrawalArrow.svg';
import TransferIcon from 'assets/icons/transferArrow.svg';
import ArrowDown from 'assets/icons/arrowDown.svg';
import ArrowUp from 'assets/icons/arrowUp.svg';
import { TEXT_VARIANTS } from 'config/theme';
import { formatDate } from 'core/utils';
import { useTranslation } from 'react-i18next';
import { CurrencyShort } from 'core/interfaces';

import { TransactionStatus } from '../TransactionStatus';
import { styles } from './TransactionsList.styles';
import { TransactionItemFragment } from '../../TransactionHistory.queries';

interface TransactionsListItemProps {
  currency?: CurrencyShort;
  transactionRef: TransactionHistoryItem_fragment$key;
}

const getIconByTransactionType = (transactionType: PaymentTransactionType) =>
  transactionType === 'DEPOSIT' ? <TransferIcon /> : <WithDrawalIcon />;

export const TransactionListItem: FC<TransactionsListItemProps> = memo(
  ({ transactionRef, currency }) => {
    const {
      amount,
      paymentTransactionType,
      createdDate,
      referenceID,
      changedDate,
      state,
    } = useFragment(TransactionItemFragment, transactionRef) || {};

    const { t } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);

    const onPressExpand = () => {
      setIsExpanded((prevValue) => !prevValue);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressExpand}
        style={styles.itemContainer}
      >
        <View style={styles.infoContainer}>
          <View style={styles.leftSide}>
            <View style={styles.circle}>
              {getIconByTransactionType(paymentTransactionType)}
            </View>
            <View>
              <Text style={[TEXT_VARIANTS.font14, styles.transactionType]}>
                {paymentTransactionType}
              </Text>
              <Text style={[TEXT_VARIANTS.font10, styles.createdDate]}>
                {formatDate(createdDate, 'HH:mm DD.MM.YYYY')}
              </Text>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <View style={styles.amountView}>
              <Text style={[TEXT_VARIANTS.font14Bold, styles.amount]}>
                {`${amount} ${currency?.shortSign}`}
              </Text>
              <TransactionStatus t={t} status={state} />
            </View>

            {isExpanded ? <ArrowUp /> : <ArrowDown />}
          </View>
        </View>
        {isExpanded && (
          <View style={styles.transactionIdDetails}>
            <View style={styles.row}>
              <Text style={TEXT_VARIANTS.font10}>Transaction id</Text>
              <Text style={TEXT_VARIANTS.font10}>{referenceID}</Text>
            </View>
            {state === 'SUCCESSFUL' && (
              <View style={[styles.row, styles.transactionIdDetailsMargin]}>
                <Text style={TEXT_VARIANTS.font10}>
                  {t('TRANSACTION_CONFIRMATION_DATE')}
                </Text>
                <Text style={TEXT_VARIANTS.font10}>
                  {formatDate(changedDate, 'DD.MM.YYYY HH:mm')}
                </Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  },
);
