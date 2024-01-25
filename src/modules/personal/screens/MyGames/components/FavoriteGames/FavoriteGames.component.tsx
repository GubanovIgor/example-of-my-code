import { GamesSection } from 'components/GamesSection';
import React, { FC, memo, useMemo, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { FavoriteGamesQuery } from 'queries/__generated__/FavoriteGamesQuery.graphql';
import { ScrollView } from 'react-native';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';

import { NoFavoritesView } from '../NoFavoritesView';
import { styles } from './FavoriteGames.styles';

const query = graphql`
  query FavoriteGamesQuery($ids: [ID!]!) {
    gamesByIds(gameIds: $ids) {
      items {
        ...HomeGameCard_fragment
      }
    }
  }
`;

interface Props {
  gameIds: string[];
}

export const FavoriteGames: FC<Props> = memo(({ gameIds }) => {
  const [fetchKey, setFetchKey] = useState(0);

  const data = useLazyLoadQuery<FavoriteGamesQuery>(
    query,
    {
      ids: gameIds,
    },
    { fetchKey },
  );
  const games = useMemo(() => data?.gamesByIds?.items ?? [], [data]);

  const onRefresh = () => {
    setFetchKey((prev) => prev + 1);
  };

  return (
    <CustomErrorBoundary onRefresh={onRefresh}>
      {!games?.length ? (
        <NoFavoritesView />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <GamesSection
            isToRightIcon={false}
            games={games}
            containerStyle={styles.container}
          />
        </ScrollView>
      )}
    </CustomErrorBoundary>
  );
});
