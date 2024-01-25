import React, { FC } from 'react';
import { View } from 'react-native';

import { TransactionsList } from './components';
import { styles } from './TransactionHistory.styles';
import { TransactionHistoryPresenterProps } from './TransactionHistory.types';

export const TransactionHistoryPresenter: FC<
  TransactionHistoryPresenterProps
> = ({
  transactions,
  userCurrency,
  isLoadingNext,
  isRefetching,
  onLoadNext,
  onRefetch,
  onPressDeposit,
}) => (
  <View style={styles.container}>
    <TransactionsList
      userCurrency={userCurrency}
      onPressDeposit={onPressDeposit}
      isRefetching={isRefetching}
      isLoadingNext={isLoadingNext}
      onLoadNext={onLoadNext}
      transactions={transactions}
      onRefetch={onRefetch}
    />
  </View>
);
