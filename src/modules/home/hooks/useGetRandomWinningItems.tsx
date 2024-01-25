import { useEffect, useMemo, useState } from 'react';
import { useInterval } from 'core/hooks';
import { WinningNow_fragment$data } from 'queries/__generated__/WinningNow_fragment.graphql';
import { getRandomNumberInRange } from 'core/utils/getRandomNumberInRange';
import { getRandomItemsFromArray } from 'core/helpers/getRandomItemsFromArray';
import { getWinningsInterval } from 'core/utils/getWinningsInterval';

export interface IRandomWin {
  userName: string;
  value: number;
  emphasedImageUrl: string;
  name: string | null;
}

interface IGame {
  emphasedImageUrl: string;
  name: string | null;
}

const DELAY_ADD_WINING_ITEM = 5000;

const generateRandomString = (from: number, length: number): string =>
  Math.random().toString(36).substr(from, length);

export const useGetRandomWinningItems = (
  data: WinningNow_fragment$data,
): { randomWins: IRandomWin[] } => {
  const [randomWins, setRandomWins] = useState<IRandomWin[] | []>([]);

  const games = useMemo(
    () =>
      [
        data.hotWin?.items,
        data.topWin?.items,
        data.popWin?.items,
        data.newWin?.items,
      ].flat(1),
    [data],
  );

  const generateData = (): IRandomWin[] | [] => {
    const randomFirstAndSecondLetter = generateRandomString(2, 2);
    const randomLastLetter = generateRandomString(2, 1);

    if (!games) return [];
    const randomGames = getRandomItemsFromArray<IGame>(4, games as []);

    const result = randomGames.map((game) => ({
      ...game,
      userName: `${randomFirstAndSecondLetter}****${randomLastLetter}`,
      value: getRandomNumberInRange(getWinningsInterval()),
    }));

    if (result?.length) {
      return result;
    }

    return [];
  };

  useInterval({
    callback: () => {
      setRandomWins(generateData);
    },
    delay: DELAY_ADD_WINING_ITEM,
  });

  useEffect(() => {
    if (games) setRandomWins(generateData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  return {
    randomWins,
  };
};
