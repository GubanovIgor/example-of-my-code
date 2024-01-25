import { GameCardItem } from 'components/GameCardItem';
import { TEXT_VARIANTS } from 'config/theme';
import { HomeGameCard_fragment$key } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { RecommendedGamesListQuery } from 'queries/__generated__/RecommendedGamesListQuery.graphql';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { styles } from './RecommendedGamesList.styles';

const query = graphql`
  query RecommendedGamesListQuery {
    gamesByFilter(take: 2) {
      items {
        ...HomeGameCard_fragment
      }
    }
  }
`;

const renderItem = (item: HomeGameCard_fragment$key) => (
  <GameCardItem
    //@ts-ignore
    key={item?.__id}
    gameData={item}
    horizontalMargin={18}
    styleProps={styles.horizontalMargin}
  />
);

interface Props {
  containerStyles?: StyleProp<ViewStyle>;
}

export const RecommendedGamesList: FC<Props> = ({ containerStyles }) => {
  const { t } = useTranslation();
  const recommendedGames = useLazyLoadQuery<RecommendedGamesListQuery>(
    query,
    {},
  );

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[TEXT_VARIANTS.font16, styles.title]}>
        {t('RECOMMENDED')}
      </Text>
      <View style={styles.gamesView}>
        {recommendedGames?.gamesByFilter?.items?.map(renderItem)}
      </View>
    </View>
  );
};
