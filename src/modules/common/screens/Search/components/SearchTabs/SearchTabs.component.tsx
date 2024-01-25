import { ProvidersList } from 'components/ProvidersList';
import { TabView } from 'components/TabView/TabView.component';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue } from 'core/interfaces';
import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { FragmentRefs } from 'relay-runtime';

import { GamesList } from '../GamesList';
import { styles } from './SearchTabs.styles';

const getBalanceScreenTitles = (t: GetTranslationValue) => [
  { value: t('GAMES'), key: 0 },
  { value: t('PROVIDERS'), key: 1 },
];

interface Props {
  games:
    | readonly {
        readonly ' $fragmentSpreads': FragmentRefs<'HomeGameCard_fragment'>;
      }[]
    | null
    | undefined;
  providers?: any;
  getGamePressHandler: (data: HomeGameCard_fragment$data) => () => void;
}

const getEmptyComponentRenderer = (t: GetTranslationValue) => (
  <View style={styles.emptyComponent}>
    <Text style={[TEXT_VARIANTS.font14, styles.noProvidersText]}>
      {t('PROVIDERS_NOT_FOUND')}
    </Text>
  </View>
);

export const SearchTabs: FC<Props> = ({
  games,
  providers,
  getGamePressHandler,
}) => {
  const { t } = useTranslation();
  const [sceneIndex, setSceneIndex] = useState(0);

  const renderEmptyComponent = getEmptyComponentRenderer(t);

  const SCREEN_SCENES = [
    <View key={0} style={styles.gamesListContainer}>
      <GamesList
        contentContainerStyles={styles.gamesContentContainer}
        getGamePressHandler={getGamePressHandler}
        games={games}
      />
    </View>,
    <View key={1} style={styles.providersListContainer}>
      <ProvidersList
        itemColor={COLORS.GRAY_BORDER}
        customEmptyComponent={renderEmptyComponent}
        containerStyles={styles.providersContainer}
        hasHeader={false}
        providers={providers}
      />
    </View>,
  ];

  return (
    <View style={styles.container}>
      <TabView
        setSceneIndex={setSceneIndex}
        sceneIndex={sceneIndex}
        titles={getBalanceScreenTitles(t)}
        scenes={SCREEN_SCENES}
      />
    </View>
  );
};
