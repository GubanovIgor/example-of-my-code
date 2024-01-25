import { FragmentRefs } from 'relay-runtime';

export const getNormalizedPaginationData = <T extends string>(
  edges?:
    | readonly {
        readonly cursor: string;
        readonly node: {
          readonly ' $fragmentSpreads': FragmentRefs<T>;
        };
      }[]
    | null,
) => edges?.map((el) => el.node);
