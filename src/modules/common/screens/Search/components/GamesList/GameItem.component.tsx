import React, { FC } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import { GameFragment } from 'modules/home/screens/Home/Home.queries';
import {
  HomeGameCard_fragment$data,
  HomeGameCard_fragment$key,
} from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useFragment } from 'react-relay';

import { styles } from './GamesList.styles';

interface GamesItemProps {
  data: HomeGameCard_fragment$key;
  getGamePressHandler: (game: HomeGameCard_fragment$data) => () => void;
}

export const GameItem: FC<GamesItemProps> = ({ data, getGamePressHandler }) => {
  const game = useFragment(GameFragment, data);

  const onPressGame = getGamePressHandler(game);

  return (
    <TouchableOpacity onPress={onPressGame} style={styles.itemContainer}>
      <FastImage
        source={{ uri: game?.rectangularImageUrl }}
        style={styles.itemImage}
        resizeMode="stretch"
      />
      <View style={styles.itemInfoContainer}>
        <Text style={[TEXT_VARIANTS.font14Bold, styles.itemName]}>
          {game?.name}
        </Text>
        <Text style={[TEXT_VARIANTS.font12, styles.itemProvider]}>
          {game?.providerName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
