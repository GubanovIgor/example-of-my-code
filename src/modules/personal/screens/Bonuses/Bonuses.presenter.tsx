import { BonusItemList } from 'components/BonusItemList';
import { SubHeader } from 'components/SubHeader';
import { TabView } from 'components/TabView/TabView.component';
import { GUTTER_SIZE } from 'config/theme';
import { GetTranslationValue, LazyLoadQueryOptions } from 'core/interfaces';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './Bonuses.styles';

interface BonusesPresenterProps {
  queryOptions?: LazyLoadQueryOptions;
  setSceneIndex: (index: number) => void;
  sceneIndex: number;
}

const getBonusesScreenTitles = (t: GetTranslationValue) => [
  { value: t('ACTIVE'), key: 0 },
  { value: t('ARCHIVE'), key: 1 },
];

export const BonusesPresenter: FC<BonusesPresenterProps> = ({
  queryOptions,
  setSceneIndex,
  sceneIndex,
}) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const BONUSES_SCREEN_SCENES = [
    <BonusItemList key={0} isActive queryOptions={queryOptions} />,
    <BonusItemList key={1} isActive={false} queryOptions={queryOptions} />,
  ];

  return (
    <>
      <SubHeader isBackButton title={t('BONUSES')} />
      <View
        style={[
          styles.container,
          {
            marginTop: GUTTER_SIZE * 8,
            paddingBottom: bottom + GUTTER_SIZE * 8,
          },
        ]}
      >
        <TabView
          titles={getBonusesScreenTitles(t)}
          scenes={BONUSES_SCREEN_SCENES}
          setSceneIndex={setSceneIndex}
          sceneIndex={sceneIndex}
        />
      </View>
    </>
  );
};
