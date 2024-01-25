import React, { useCallback, useState } from 'react';
import { useFavoriteStore } from 'store/favoriteStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { useTranslation } from 'react-i18next';
import { useLastPlayedStore } from 'store/lastPlayedStore';

import { MyGamesPresenter } from './MyGames.presenter';

export const MyGamesContainer = () => {
  const { t } = useTranslation();
  const favoriteGamesIds = useFavoriteStore((state) => state.getGames());
  const lastPlayedGamesIds = useLastPlayedStore((state) =>
    state.getLastGames(),
  );

  const [gamesIdsObj] = useState({
    favorite: favoriteGamesIds,
    lastPlayed: lastPlayedGamesIds,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlerBackButton = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <MyGamesPresenter
      favoriteGamesIds={gamesIdsObj.favorite}
      lastPlayedGamesIds={gamesIdsObj.lastPlayed}
      hasBackButton={true}
      handlerBackButton={handlerBackButton}
      t={t}
    />
  );
};
