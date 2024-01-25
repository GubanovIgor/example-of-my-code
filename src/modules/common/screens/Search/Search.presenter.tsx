import React, { FC } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import { Text, TouchableOpacity, View } from 'react-native';

import { GamesList } from './components';
import { styles } from './Search.styles';
import { SearchPresenterProps } from './Search.types';
import { SearchTabs } from './components/SearchTabs';
import { IGameList } from './components/GamesList/GamesList.types';

export const SearchPresenter: FC<SearchPresenterProps> = ({
  t,
  gamesData,
  getGamePressHandler,
  handlePressRandomGame,
  isInSearch,
}) => (
  <View style={styles.container}>
    {!isInSearch ? (
      <>
        <View>
          <TouchableOpacity
            onPress={handlePressRandomGame}
            style={styles.randomGameBtn}
          >
            <Text style={TEXT_VARIANTS.font12}>{t('FEELING_LUCKY')}</Text>
          </TouchableOpacity>
          <Text style={[TEXT_VARIANTS.font14, styles.recommendedText]}>
            {t('RECOMMENDED')}
          </Text>
        </View>
        <GamesList
          getGamePressHandler={getGamePressHandler}
          games={gamesData?.gamesRecommended?.items}
        />
      </>
    ) : (
      <SearchTabs
        games={gamesData?.searchData?.games as IGameList}
        providers={gamesData?.searchData?.providers}
        getGamePressHandler={getGamePressHandler}
      />
    )}
  </View>
);
