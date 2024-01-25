import React, { FC, useCallback, useState } from 'react';
import { PaginationListFooter } from 'components/PaginationListFooter';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FragmentRefs } from 'relay-runtime';
import { BetHistoryListItem_fragment$key } from 'queries/__generated__/BetHistoryListItem_fragment.graphql';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { NoDataView } from 'components/NoDataView';
import { FlashListCustom } from 'components/FlashListCustom';

import { BetHistoryItem } from './BetHistoryListItem.component';
import { styles } from './BetHistoryList.styles';

interface BetHistoryListProps {
  data?:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'BetHistoryListItem_fragment'>;
      }[]
    | undefined;
  t: GetTranslationValue;
  onLoadNext: VoidFunction;
  onRefetch: VoidFunction;
  onPressPopular: VoidFunction;
  isRefetching: boolean;
  isLoadingNext: boolean;
}

const renderItem = ({ item }: { item: BetHistoryListItem_fragment$key }) => (
  <BetHistoryItem betHistoryRef={item} />
);

const renderSeparator = () => <View style={styles.separator} />;

const getEmptyComponentRenderer = (
  t: GetTranslationValue,
  onPress: VoidFunction,
) => (
  <NoDataView
    title={t('EMPTY_BET_HISTORY')}
    description={t('MAKE_FIRST_BET')}
    buttonTitle={t('MAIN_PAGE')}
    onPress={onPress}
  />
);

// @ts-ignore
const keyExtractor = (item: any) => item.__id;

export const BetHistoryList: FC<BetHistoryListProps> = ({
  t,
  data,
  isLoadingNext,
  isRefetching,
  onRefetch,
  onLoadNext,
  onPressPopular,
}) => {
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

  const renderEmptyComponent = getEmptyComponentRenderer(t, onPressPopular);

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <FlashListCustom
        isRefetching={isRefetching}
        onRefresh={onRefetch}
        data={data}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        emptyComponent={renderEmptyComponent}
        ListFooterComponent={<PaginationListFooter isLoading={isLoadingNext} />}
        ItemSeparatorComponent={renderSeparator}
        onMomentumScrollBegin={onMomentumScrollBegin}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
      />
    </View>
  );
};
