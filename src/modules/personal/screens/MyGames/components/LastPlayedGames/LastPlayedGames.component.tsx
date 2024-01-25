import { GamesSection } from 'components/GamesSection';
import React, { FC, memo, useMemo, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { ScrollView, Text, View } from 'react-native';
import { LastPlayedGamesQuery } from 'queries/__generated__/LastPlayedGamesQuery.graphql';
import { CustomErrorBoundary } from 'components/CustomErrorBoundary';
import { NoDataView } from 'components/NoDataView';
import { TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue } from 'core/interfaces';
import EmptyBoxIcon from 'assets/icons/emptyBox.svg';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { styles } from './LastPlayedGames.styles';

const query = graphql`
  query LastPlayedGamesQuery($ids: [ID!]!) {
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

const getNoDataViewCustomDesc = (t: GetTranslationValue) => (
  <View style={styles.noLastPlayedGamesView}>
    <EmptyBoxIcon />
    <Text style={[TEXT_VARIANTS.font14, styles.noLastPlayedGamesText]}>
      {t('NO_LAST_PLAYED_GAMES')}
    </Text>
  </View>
);

export const LastPlayedGames: FC<Props> = memo(({ gameIds }) => {
  const navigation = useNavigation();

  const { t } = useTranslation();
  const [fetchKey, setFetchKey] = useState(0);

  const data = useLazyLoadQuery<LastPlayedGamesQuery>(
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

  const onPressGoToMainPage = () => {
    navigation.goBack();
  };

  return (
    <CustomErrorBoundary onRefresh={onRefresh}>
      {!games?.length ? (
        <NoDataView
          onPress={onPressGoToMainPage}
          customDescription={getNoDataViewCustomDesc(t)}
        />
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
