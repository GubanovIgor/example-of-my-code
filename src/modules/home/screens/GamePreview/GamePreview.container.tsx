import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFavoriteStore } from 'store/favoriteStore';
import { shallow } from 'zustand/shallow';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'core/interfaces/navigation';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from 'store/authStore';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';

import { PATHS } from 'constants/PATHS';

import { GamePreviewPresenter } from './GamePreview.presenter';

export const GamePreviewContainer = ({
  route,
}: RootStackScreenProps<PATHS.GAME_PREVIEW>) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { game } = route?.params || {};

  const { setGame, games } = useFavoriteStore(
    (state) => ({
      getGame: state.getGame,
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

  const handlePressGoToSession = useCallback(
    (isDemo?: boolean) => () => {
      const navigationData = {
        path: isLoggedIn || isDemo ? PATHS.GAME_SESSION : PATHS.SIGN_IN,
        params:
          isLoggedIn || isDemo ? { game, isPaidMode: !isDemo } : undefined,
      };

      //@ts-ignore
      navigation.navigate(navigationData.path, navigationData.params);
    },
    [game, navigation, isLoggedIn],
  );

  const handlePressLike = () => {
    if (!game?.id) return;
    setGame(game?.id, isLiked);
  };

  const handlePressProvider = () => {
    navigation.pop();
    navigation.navigate(PATHS.PROVIDER, {
      providerName: game?.providerName || '',
    });
  };

  return (
    <BottomSheetWrapper shouldHaveHeader={false} screenKey={PATHS.GAME_PREVIEW}>
      <GamePreviewPresenter
        t={t}
        handlePressGoToSession={handlePressGoToSession}
        handlePressLike={handlePressLike}
        handlePressProvider={handlePressProvider}
        isLiked={isLiked}
        game={game}
      />
    </BottomSheetWrapper>
  );
};
