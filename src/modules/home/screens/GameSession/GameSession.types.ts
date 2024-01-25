import { LazyLoadQueryOptions } from 'core/interfaces';
import { RootStackScreenProps } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { GameSessionScreenQuery$data } from '../../../../queries/__generated__/GameSessionScreenQuery.graphql';

export interface GameSessionPresenterProps {
  gameData?: GameSessionScreenQuery$data;
}

export type GameSessionContainerProps = {
  queryOptions?: LazyLoadQueryOptions;
} & RootStackScreenProps<PATHS.GAME_SESSION>;

export interface GameResult {
  readonly currency: {
    readonly internalId: any;
    readonly name: string | null;
    readonly shortSign: string | null;
    readonly symbol: string | null;
  };
  readonly lost: any;
  readonly won: any;
}
