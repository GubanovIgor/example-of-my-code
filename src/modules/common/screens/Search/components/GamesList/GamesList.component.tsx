import React, { FC } from 'react';
import {
  HomeGameCard_fragment$data,
  HomeGameCard_fragment$key,
} from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { GetTranslationValue } from 'core/interfaces';
import { useTranslation } from 'react-i18next';
import { TEXT_VARIANTS } from 'config/theme';

import { GameItem } from './GameItem.component';
import { styles } from './GamesList.styles';
import { FlatListItemProps, GamesListProps } from './GamesList.types';

const getItemRenderer =
  (getGamePressHandler: (game: HomeGameCard_fragment$data) => () => void) =>
  ({ item }: FlatListItemProps) =>
    (
      <GameItem
        getGamePressHandler={getGamePressHandler}
        data={item as HomeGameCard_fragment$key}
      />
    );

const getEmptyComponentRenderer = (t: GetTranslationValue) => (
  <View style={styles.emptyComponent}>
    <Text style={[TEXT_VARIANTS.font14, styles.noGamesText]}>
      {t('GAMES_NOT_FOUND')}
    </Text>
  </View>
);

export const GamesList: FC<GamesListProps> = ({
  games,
  contentContainerStyles,
  getGamePressHandler,
}) => {
  const { t } = useTranslation();
  const renderItem = getItemRenderer(getGamePressHandler);
  const { top, bottom } = useSafeAreaInsets();

  const renderEmptyComponent = getEmptyComponentRenderer(t);

  return (
    <View
      style={[
        styles.contentContainerStyle,
        contentContainerStyles,
        { paddingBottom: top + bottom },
      ]}
    >
      <FlashList
        data={games}
        ListEmptyComponent={renderEmptyComponent}
        renderItem={renderItem}
        estimatedItemSize={200}
      />
    </View>
  );
};
