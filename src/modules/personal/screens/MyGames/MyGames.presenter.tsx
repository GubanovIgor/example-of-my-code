import React, { FC, Suspense, useState } from 'react';
import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { GetTranslationValue } from 'core/interfaces';
import { TabView } from 'components/TabView/TabView.component';
import { LoadingView } from 'components/LoadingView';
import { SubHeader } from 'components/SubHeader';

import { FavoriteGames, LastPlayedGames } from './components';

const getTabsTitles = (t: GetTranslationValue) => [
  { value: t('LAST_PLAYED'), key: 0 },
  { value: t('FAVORITE'), key: 1 },
];

interface Props {
  handlePressGameCard?: (data?: HomeGameCard_fragment$data) => void;
  hasBackButton?: boolean;
  lastPlayedGamesIds: string[];
  favoriteGamesIds: string[];
  handlerBackButton: () => void;
  t: GetTranslationValue;
}

export const MyGamesPresenter: FC<Props> = ({
  lastPlayedGamesIds,
  favoriteGamesIds,
  t,
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);

  const SCREEN_SCENES = [
    <Suspense key={0} fallback={<LoadingView />}>
      <LastPlayedGames gameIds={lastPlayedGamesIds} />
    </Suspense>,
    <Suspense key={1} fallback={<LoadingView />}>
      <FavoriteGames gameIds={favoriteGamesIds} />
    </Suspense>,
  ];

  return (
    <>
      <SubHeader shouldUseInsets={false} isBackButton title={t('MY_GAMES')} />
      <TabView
        setSceneIndex={setSceneIndex}
        sceneIndex={sceneIndex}
        titles={getTabsTitles(t)}
        scenes={SCREEN_SCENES}
      />
    </>
  );
};
