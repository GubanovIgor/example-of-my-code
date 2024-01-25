import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ViewStyle,
} from 'react-native';
import { useFragment } from 'react-relay';
import { COLORS, GUTTER_SIZE, SPACING, TEXT_VARIANTS } from 'config/theme';
import FavoriteIcon from 'assets/icons/favorite.svg';
import FavoriteFillIcon from 'assets/icons/favoriteFill.svg';
import { GameFragment } from 'modules/home/screens/Home/Home.queries';
import {
  HomeGameCard_fragment$data,
  HomeGameCard_fragment$key,
} from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { useFavoriteStore } from 'store/favoriteStore';
import { shallow } from 'zustand/shallow';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { SCREEN_WIDTH } from '../constants';

interface IGameCardItemProps {
  horizontalMargin?: number;
  gameData: HomeGameCard_fragment$key;
  onPressCard?: (data?: HomeGameCard_fragment$data) => void;
  styleProps?: ViewStyle;
}

export const GameCardItem = ({
  gameData,
  onPressCard,
  styleProps,
  horizontalMargin = 20,
}: IGameCardItemProps) => {
  const gameCardWidth = SCREEN_WIDTH / 2 - horizontalMargin;
  const gameCardHeight = gameCardWidth * 0.48;

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const data = useFragment(GameFragment, gameData);
  const { rectangularImageUrl, name, providerName, id } = data || {};
  const { setGame, games } = useFavoriteStore(
    (state) => ({
      getGame: state.getGame,
      setGame: state.setGame,
      games: state.games,
    }),
    shallow,
  );

  const isLiked = useMemo(() => Boolean(games[id]), [games, id]);

  const handlePressGameCard = () => {
    navigation.navigate(PATHS.GAME_PREVIEW, { game: data });

    onPressCard && onPressCard();
  };

  const handlePressLike = () => {
    setGame(data?.id, isLiked);
  };

  return (
    <TouchableOpacity
      onPress={handlePressGameCard}
      style={[
        styles.container,
        { marginHorizontal: horizontalMargin / 2 },
        styleProps,
      ]}
    >
      <Image
        resizeMode="stretch"
        source={{ uri: rectangularImageUrl }}
        style={[styles.image, { width: gameCardWidth, height: gameCardHeight }]}
      />
      <View style={[styles.infoContainer, { width: gameCardWidth }]}>
        <View style={styles.infoTextContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[TEXT_VARIANTS.font12Bold, styles.title]}
          >
            {name}
          </Text>
          <Text style={[TEXT_VARIANTS.font12, styles.gameType]}>
            {providerName}
          </Text>
        </View>
        <TouchableOpacity
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          onPress={handlePressLike}
        >
          {isLiked ? (
            <FavoriteFillIcon
              width="24"
              height="24"
              style={styles.favoriteIcon}
            />
          ) : (
            <FavoriteIcon
              width="24"
              height="24"
              fill={COLORS.TEXT_GRAY}
              style={styles.favoriteIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.M,
  },
  image: {
    borderRadius: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoTextContainer: {
    flex: 1,
  },
  title: {
    textTransform: 'none',
    marginTop: SPACING.XS,
  },
  gameType: {
    color: COLORS.TEXT_GRAY,
  },
  favoriteIcon: {
    marginRight: GUTTER_SIZE,
  },
});
