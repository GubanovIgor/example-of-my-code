import React, { FC, useCallback, useState } from 'react';
import { PaginationListFooter } from 'components/PaginationListFooter';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FragmentRefs } from 'relay-runtime';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { NoDataView } from 'components/NoDataView';
import { FlashListCustom } from 'components/FlashListCustom';
import { WinningsListItem_fragment$key } from 'queries/__generated__/WinningsListItem_fragment.graphql';
import { RecommendedGamesList } from 'components/RecommendedGames/RecommendedGamesList';

import { WinningsListItem } from './WinningsListItem.component';
import { styles } from './WinningsList.styles';

interface Props {
  data?: {
    readonly ' $fragmentSpreads': FragmentRefs<'WinningsListItem_fragment'>;
  }[];
  t: GetTranslationValue;
  onLoadNext: VoidFunction;
  onRefetch: VoidFunction;
  isRefetching: boolean;
  isLoadingNext: boolean;
}

const renderItem = ({ item }: { item: WinningsListItem_fragment$key }) => (
  <WinningsListItem fragmentRef={item} />
);

const renderSeparator = () => <View style={styles.listSeparator} />;

const getEmptyComponentRenderer = (t: GetTranslationValue) => (
  <>
    <NoDataView
      title={t('MY_WINNINGS_EMPTY_BLOCK.TITLE')}
      description={t('MY_WINNINGS_EMPTY_BLOCK.SUBTITLE')}
    />
    <RecommendedGamesList />
  </>
);

// @ts-ignore
const keyExtractor = (item: any) => item.__id;

export const WinningsList: FC<Props> = ({
  t,
  data,
  isLoadingNext,
  isRefetching,
  onRefetch,
  onLoadNext,
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

  const renderEmptyComponent = getEmptyComponentRenderer(t);

  return (
    <View style={[styles.listContainer, { paddingBottom: bottom }]}>
      <FlashListCustom
        isRefetching={isRefetching}
        onRefresh={onRefetch}
        data={data}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.contentContainer}
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
