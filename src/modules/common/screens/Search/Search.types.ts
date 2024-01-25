import { GetTranslationValue, LazyLoadArgs } from 'core/interfaces';
import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import {
  SearchScreenGamesQuery$data,
  SearchScreenGamesQuery$variables,
} from 'queries/__generated__/SearchScreenGamesQuery.graphql';

export interface SearchPresenterProps {
  gamesData?: SearchScreenGamesQuery$data;
  getGamePressHandler: (game: HomeGameCard_fragment$data) => () => void;
  handlePressRandomGame: () => void;
  t: GetTranslationValue;
  isInSearch: boolean;
}
export interface SearchContainerProps {
  isInSearch: boolean;
  queryArgs: LazyLoadArgs<SearchScreenGamesQuery$variables>;
}
