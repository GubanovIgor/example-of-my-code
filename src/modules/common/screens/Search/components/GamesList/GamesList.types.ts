import { HomeGameCard_fragment$data } from 'queries/__generated__/HomeGameCard_fragment.graphql';
import { StyleProp, ViewStyle } from 'react-native';
import { FragmentRefs } from 'relay-runtime';

export type IGameList =
  | readonly {
      readonly ' $fragmentSpreads': FragmentRefs<'HomeGameCard_fragment'>;
    }[]
  | null
  | undefined;
export interface GamesListProps {
  contentContainerStyles?: StyleProp<ViewStyle>;
  games?: IGameList;
  getGamePressHandler: (game: HomeGameCard_fragment$data) => () => void;
}

export interface FlatListItemProps {
  item: Readonly<{
    readonly ' $fragmentSpreads': FragmentRefs<'HomeGameCard_fragment'>;
  }>;
  index: number;
}
