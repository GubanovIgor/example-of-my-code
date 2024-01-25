import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryItemList } from 'components/CategoryItemList';
import { Swiper } from 'components/Swiper';
import { GamesSection } from 'components/GamesSection';
import { useTranslation } from 'react-i18next';
import { ProvidersList } from 'components/ProvidersList';
import { getSlicedArray } from 'core/utils';
import { CrazyTime } from 'components/PromoBanners/CrazyTime';
import { MonopolyLive } from 'components/PromoBanners/MonopolyLive';
import { GoSpinner } from 'components/PromoBanners/GoSpinner';
import { HungryShark } from 'components/PromoBanners/HungryShark';
import { Spaceman } from 'components/PromoBanners/Spaceman';

import { styles } from './Home.styles';
import { HomePresenterProps } from './Home.types';
import { WinningNow } from '../../components';

export const HomePresenter: FC<HomePresenterProps> = ({
  data,
  handlePressAllProviders,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <View style={styles.headerSection}>
        <Swiper />
        <CategoryItemList fragmentRef={data} />
      </View>

      {Boolean(data?.top?.items?.length) && (
        <GamesSection
          title={String(t('POPULAR'))}
          tag="POP"
          games={data?.pop?.items}
        />
      )}
      <CrazyTime />
      <MonopolyLive />
      {Boolean(data?.new?.items?.length) && (
        <GamesSection
          title={String(t('NEW'))}
          tag="NEW"
          games={data?.new?.items}
        />
      )}
      <GoSpinner />
      <HungryShark />
      {Boolean(data?.providers?.items?.length) && (
        <ProvidersList
          containerStyles={styles.providersContainer}
          onPressSeeAll={handlePressAllProviders}
          type="horizontal"
          providers={getSlicedArray(10, data?.providers?.items as [])}
        />
      )}
      <Spaceman />
      {Boolean(data?.pop?.items?.length) && (
        <GamesSection
          title={String(t('TOP'))}
          tag="TOP"
          games={data?.top?.items}
        />
      )}
      <WinningNow fragmentRef={data} />
    </ScrollView>
  );
};
