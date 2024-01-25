import React, { FC } from 'react';
import { GamesSection } from 'components/GamesSection';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { FragmentRefs } from 'relay-runtime';
import { NoDataView } from 'components/NoDataView';
import { ProvidersList } from 'components/ProvidersList';
import { ScrollView, Text } from 'react-native';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './Provider.styles';

interface ProviderPresenterProps {
  games?: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'HomeGameCard_fragment'>;
  }> | null;
  providers?: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'ProvidersListItem_fragment'>;
  }> | null;
  isLoadingNext: boolean;
  onEndReached: VoidFunction;
  t: GetTranslationValue;
}

export const ProviderPresenter: FC<ProviderPresenterProps> = ({
  games,
  isLoadingNext,
  providers,
  onEndReached,
  t,
}) => {
  const { bottom } = useSafeAreaInsets();
  return !games?.length ? (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <NoDataView title={t('NO_GAMES_FOR_PROVIDER')} />
      <Text style={[TEXT_VARIANTS.font16, styles.moreProvidersText]}>
        {t('MORE_PROVIDERS')}
      </Text>
      <ProvidersList
        containerStyles={[
          styles.providersListContainer,
          { paddingBottom: bottom + GUTTER_SIZE * 2 },
        ]}
        hasHeader={false}
        type="horizontal"
        providers={providers}
      />
    </ScrollView>
  ) : (
    <GamesSection
      isPagination
      containerStyle={styles.contentContainer}
      isLoadingNext={isLoadingNext}
      onEndReached={onEndReached}
      games={games}
      isToRightIcon={false}
    />
  );
};
