import React, { Suspense, useEffect, useRef, useState } from 'react';
import { fetchQuery, useLazyLoadQuery } from 'react-relay';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { GameSessionScreenQuery } from 'queries/__generated__/GameSessionScreenQuery.graphql';
import { RootStackScreenProps } from 'core/interfaces/navigation';
import { useLocalisationStore } from 'store/localisationStore';
import { GameSessionFooter } from 'components/GameSessionFooter';
import { useInterval } from 'core/hooks';
import { Modalize } from 'react-native-modalize';
import dayjs from 'dayjs';
import { getClientEnvironment } from 'relay/index';
import { GameSessionShortresultsQuery } from 'queries/__generated__/GameSessionShortresultsQuery.graphql';
import { useUserStore } from 'store/userStore';
import { convertMsToMinutes } from 'core/utils';
import { useLastPlayedStore } from 'store/lastPlayedStore';
import { shallow } from 'zustand/shallow';

import { PATHS } from 'constants/PATHS';

import { CustomErrorBoundary, LoadingView } from '../../../../components';
import { GameSessionPresenter } from './GameSession.presenter';
import { GameQuery, GamingShortResultsQuery } from './GameSession.queries';
import { GameResult, GameSessionContainerProps } from './GameSession.types';
import { WARNING_INTERVALS } from './GameSession.constants';
import { PlayerTimeWarning } from './components';

const CURRENT_DATE = dayjs();

export const GameSessionSuspenseWrapper = (
  props: RootStackScreenProps<PATHS.GAME_SESSION>,
) => {
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>();

  const { game, isPaidMode } = props?.route?.params || {};

  const onRefresh = () => {
    setRefreshedQueryOptions((prev) => ({
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  return (
    <>
      <CustomErrorBoundary onRefresh={onRefresh}>
        <Suspense fallback={<LoadingView />}>
          <GameSessionContainer
            {...props}
            queryOptions={refreshedQueryOptions}
          />
        </Suspense>
      </CustomErrorBoundary>
      {game && <GameSessionFooter isPaidMode={isPaidMode} game={game} />}
    </>
  );
};

export const GameSessionContainer = ({
  route,
  queryOptions,
}: GameSessionContainerProps) => {
  const [intervalCount, setIntervalCount] = useState(0);
  const [startDate, setStartDate] = useState(CURRENT_DATE);
  const [gameResult, setGameResult] = useState<GameResult>();

  const firstIntervalInMs = WARNING_INTERVALS[intervalCount];
  const popupRef = useRef<Modalize>(null);
  const { game, isPaidMode } = route?.params || {};
  const { currentLanguage } = useLocalisationStore();
  const { setRouteName } = useUserStore((s) => s);

  const { setLastGame } = useLastPlayedStore(
    (state) => ({
      setLastGame: state.setLastGame,
    }),
    shallow,
  );

  const data = useLazyLoadQuery<GameSessionScreenQuery>(
    GameQuery,
    {
      id: game?.id || '',
      lang: currentLanguage?.key,
      isPaidMode,
    },
    queryOptions,
  );

  useEffect(() => {
    const gameId = game?.id;

    if (!gameId) return;

    setLastGame(gameId);
  }, [game?.id, setLastGame]);

  useEffect(() => {
    if (isPaidMode) {
      setRouteName(PATHS.GAME_SESSION);
    }

    return () => {
      setRouteName(null);
    };
  }, [isPaidMode, setRouteName]);

  const getGamingShortResult = async () => {
    try {
      const res = await fetchQuery<GameSessionShortresultsQuery>(
        getClientEnvironment(),
        GamingShortResultsQuery,
        { from: startDate, to: dayjs() },
      ).toPromise();

      setGameResult(res?.gamingShortResult);
      onSuccessShortResult();
    } catch (error) {
      onErrorShortResult();
    }
  };

  const handleNewIntervalStep = () => {
    setIntervalCount((prev) => prev + 1);
    setStartDate(dayjs());
    const newDelay = WARNING_INTERVALS[intervalCount + 1];
    reset(newDelay);
  };

  const onSuccessShortResult = () => {
    popupRef?.current?.open();
    stop();
  };

  const onErrorShortResult = () => {
    stop();
    handleNewIntervalStep();
  };

  const { reset, stop } = useInterval({
    callback: () => {
      getGamingShortResult();
    },
    delay: firstIntervalInMs,
    stopCount: 3,
    shouldStart: isPaidMode,
  });

  const timePlayed = convertMsToMinutes(
    WARNING_INTERVALS[intervalCount],
  )?.toString();

  return (
    <>
      <GameSessionPresenter gameData={data} />
      <PlayerTimeWarning
        gameResult={gameResult}
        onPressConfirm={handleNewIntervalStep}
        sheetRef={popupRef}
        timePlayed={timePlayed}
      />
    </>
  );
};
