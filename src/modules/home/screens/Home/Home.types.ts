import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { LazyLoadQueryOptions, VoidFunction } from 'core/interfaces';
import { HomeScreenQuery$data } from 'queries/__generated__/HomeScreenQuery.graphql';

export interface HomePresenterProps {
  data: HomeScreenQuery$data;
  handlePressAllProviders: VoidFunction;
  handlePressGameCard?: (data?: HomeGameCard_fragment$data) => void;
}

export interface HomeContainerProps {
  queryOptions?: LazyLoadQueryOptions;
}
