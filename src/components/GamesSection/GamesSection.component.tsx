import React, { FC } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { FragmentRefs } from 'relay-runtime';
import { GameCardItem } from 'components/GameCardItem';
import { TEXT_VARIANTS } from 'config/theme';
import ArrowToRightIcon from 'assets/icons/arrowToRight.svg';
import {
  HomeGameCard_fragment$data,
  HomeGameCard_fragment$key,
} from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { GameTags } from 'queries/__generated__/CategoryScreenFilteredGamesQuery.graphql';
import { FlashList } from '@shopify/flash-list';

import { PATHS } from 'constants/PATHS';

import { styles } from './GamesSection.styles';

interface IGamesSectionProps {
  title?: string;
  tag?: GameTags | null;
  handlePressGameCard?: (data?: HomeGameCard_fragment$data) => void;
  games?: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'HomeGameCard_fragment'>;
  }> | null;
  isToRightIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  isPagination?: boolean;
  onEndReached?: () => void;
  isLoadingNext?: boolean;
}

export const keyExtractor = (item: HomeGameCard_fragment$data) => item.id;

export const getGameCardItemRenderer =
  (onPressCard?: (data?: HomeGameCard_fragment$data) => void) =>
  (item: HomeGameCard_fragment$key, index: number) =>
    <GameCardItem key={index} gameData={item} onPressCard={onPressCard} />;

export const GamesSection: FC<IGamesSectionProps> = ({
  title,
  games,
  handlePressGameCard,
  containerStyle,
  isToRightIcon = true,
  tag,
  isPagination = false,
  onEndReached,
  isLoadingNext = false,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const renderGameCardItem = getGameCardItemRenderer(handlePressGameCard);
  const handleNavigation = () => {
    navigation.navigate(PATHS.CATEGORY, {
      categoryData: { title, tag },
    });
  };

  const renderGame = ({
    item,
    index,
  }: {
    item: HomeGameCard_fragment$key;
    index: number;
  }) => renderGameCardItem(item, index);

  const renderGamesList = () =>
    isPagination ? (
      <FlashList
        horizontal={false}
        renderItem={renderGame}
        data={games}
        numColumns={2}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7}
        estimatedItemSize={200}
      />
    ) : (
      <View style={styles.gamesContainer}>
        {games?.map(renderGameCardItem)}
      </View>
    );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleContainer}>
        {Boolean(title) && (
          <Text style={[TEXT_VARIANTS.font28, styles.title]}>{title}</Text>
        )}
        {Boolean(isToRightIcon) && (
          <TouchableOpacity
            onPress={handleNavigation}
            style={styles.arrowToRightIconContainer}
          >
            <ArrowToRightIcon />
          </TouchableOpacity>
        )}
      </View>
      {renderGamesList()}
      {isLoadingNext && <ActivityIndicator />}
    </View>
  );
};
