import React, { FC, useCallback, useState } from 'react';
import { PaginationListFooter } from 'components/PaginationListFooter';
import { TransactionHistoryItem_fragment$key } from 'queries/__generated__/TransactionHistoryItem_fragment.graphql';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FragmentRefs } from 'relay-runtime';
import { NoDataView } from 'components/NoDataView';
import {
  CurrencyShort,
  GetTranslationValue,
  VoidFunction,
} from 'core/interfaces';
import { useTranslation } from 'react-i18next';
import { FlashListCustom } from 'components/FlashListCustom';

import { styles } from './TransactionsList.styles';
import { TransactionListItem } from './TransactionListItem.component';

interface TransactionsListProps {
  transactions?: {
    readonly ' $fragmentSpreads': FragmentRefs<'TransactionHistoryItem_fragment'>;
  }[];
  onLoadNext: VoidFunction;
  onRefetch: VoidFunction;
  onPressDeposit: VoidFunction;
  userCurrency?: CurrencyShort;
  isRefetching: boolean;
  isLoadingNext: boolean;
}

const getItemRenderer =
  (currency?: CurrencyShort) =>
  ({ item }: { item: TransactionHistoryItem_fragment$key }) =>
    <TransactionListItem currency={currency} transactionRef={item} />;

//@ts-ignore
const keyExtractor = (item: TransactionHistoryItem_fragment$key) => item.__id;

const getEmptyComponentRenderer = (
  t: GetTranslationValue,
  onPress: VoidFunction,
) => (
  <NoDataView
    title={t('TRANSACTION_HISTORY_EMPTY')}
    description={t('MAKE_FIRST_DEPOSIT')}
    onPress={onPress}
    buttonTitle={t('DEPOSIT')}
  />
);

export const TransactionsList: FC<TransactionsListProps> = ({
  transactions,
  isLoadingNext,
  userCurrency,
  isRefetching,
  onPressDeposit,
  onRefetch,
  onLoadNext,
}) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const [onEndMomentum, setOnEndMomentum] = useState(true);

  const onEndReached = useCallback(() => {
    if (onEndMomentum) return;
    onLoadNext();
    setOnEndMomentum(true);
  }, [onEndMomentum, onLoadNext]);

  const onMomentumScrollBegin = useCallback(() => {
    setOnEndMomentum(false);
  }, []);

  const renderEmptyComponent = getEmptyComponentRenderer(t, onPressDeposit);
  const renderItem = getItemRenderer(userCurrency);

  return (
    <View style={[styles.listContentContainer, { paddingBottom: bottom }]}>
      <FlashListCustom
        emptyComponent={renderEmptyComponent}
        isRefetching={isRefetching}
        onRefresh={onRefetch}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        ListFooterComponent={<PaginationListFooter isLoading={isLoadingNext} />}
        onMomentumScrollBegin={onMomentumScrollBegin}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        data={transactions}
      />
    </View>
  );
};
