import { CurrencyShort, LazyLoadArgs, VoidFunction } from 'core/interfaces';
import { FragmentRefs } from 'relay-runtime';

export interface TransactionHistoryPresenterProps {
  transactions?: {
    readonly ' $fragmentSpreads': FragmentRefs<'TransactionHistoryItem_fragment'>;
  }[];
  onLoadNext: VoidFunction;
  onRefetch: VoidFunction;
  onPressDeposit: VoidFunction;
  isLoadingNext: boolean;
  isRefetching: boolean;
  userCurrency?: CurrencyShort;
}
export interface TransactionHistoryContainerProps {
  queryArgs: LazyLoadArgs<any>;
  onRefetchPagination: () => void;
  isRefetchingPagination: boolean;
}
