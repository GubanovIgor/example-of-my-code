import React, { FC, useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ArrowToLeftIcon from 'assets/icons/arrowToLeft.svg';
import { RootStackParamList } from 'core/interfaces/navigation';
import FavoriteIcon from 'assets/icons/favorite.svg';
import FavoriteFillIcon from 'assets/icons/favoriteFill.svg';
import { useAuthStore } from 'store/authStore';
import { shallow } from 'zustand/shallow';
import { useFavoriteStore } from 'store/favoriteStore';
import { useTranslation } from 'react-i18next';
import { COLORS, GUTTER_SIZE } from 'config/theme';
import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PATHS } from 'constants/PATHS';

import { styles } from './GameSessionFooter.styles';
import { Button } from '..';

interface Props {
  game: HomeGameCard_fragment$data;
  isPaidMode?: boolean;
}

export const GameSessionFooter: FC<Props> = ({ game, isPaidMode }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const { bottom } = useSafeAreaInsets();

  const { setGame, games } = useFavoriteStore(
    (state) => ({
      setGame: state.setGame,
      games: state.games,
    }),
    shallow,
  );

  const { isLoggedIn } = useAuthStore((s) => ({
    isLoggedIn: Boolean(s.loginState.accessToken),
  }));

  const isLiked = useMemo(
    () => Boolean(games[String(game?.id)]),
    [games, game?.id],
  );

  const handlePressBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const handlePressLike = () => {
    if (!game?.id) return;
    setGame(game?.id, isLiked);
  };

  const handlePressGoToRealSession = useCallback(
    () => () => {
      const navigationData = {
        path: isLoggedIn ? PATHS.GAME_SESSION : PATHS.SIGN_IN,
        params: isLoggedIn ? { game, isPaidMode: true } : undefined,
      };

      // @ts-ignore
      navigation.navigate(navigationData.path, navigationData.params);
    },
    [game, navigation, isLoggedIn],
  );

  return (
    <View
      style={[styles.container, { paddingBottom: bottom + GUTTER_SIZE * 2 }]}
    >
      <TouchableOpacity
        onPress={handlePressBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <ArrowToLeftIcon />
      </TouchableOpacity>

      {!isPaidMode && (
        <Button
          text={t('REAL_PLAY')}
          onPress={handlePressGoToRealSession()}
          containerStyles={styles.button}
        />
      )}
      <TouchableOpacity onPress={handlePressLike}>
        {isLiked ? (
          <FavoriteFillIcon width="28" height="28" />
        ) : (
          <FavoriteIcon fill={COLORS.TEXT_GRAY} width="28" height="28" />
        )}
      </TouchableOpacity>
    </View>
  );
};
