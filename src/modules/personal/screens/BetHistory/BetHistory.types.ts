import {
  GetTranslationValue,
  LazyLoadArgs,
  VoidFunction,
} from 'core/interfaces';
import { FragmentRefs } from 'relay-runtime';

export interface BetHistoryPresenterProps {
  betHistory?:
    | {
        readonly ' $fragmentSpreads': FragmentRefs<'BetHistoryListItem_fragment'>;
      }[]
    | undefined;
  onLoadNext: () => void;
  onRefetch: () => void;
  isLoadingNext: boolean;
  isRefetching: boolean;
  onPressGoPopular: VoidFunction;
  t: GetTranslationValue;
}
export interface BetHistoryContainerProps {
  queryArgs: LazyLoadArgs<any>;
  onRefetchPagination: () => void;
  isRefetchingPagination: boolean;
}
