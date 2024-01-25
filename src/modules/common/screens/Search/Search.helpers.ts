import { FragmentRefs } from 'relay-runtime';
import { GetTranslationValue } from 'core/interfaces';

export const getGamesNodesList = (
  edges?:
    | readonly {
        readonly node: {
          readonly ' $fragmentSpreads': FragmentRefs<'HomeGameCard_fragment'>;
        };
      }[]
    | null,
) => edges?.map((edge) => edge.node);

export const getTabRoutes = (t: GetTranslationValue) => [
  { key: 'games', title: t('GAMES') },
  { key: 'providers', title: t('PROVIDERS') },
];
