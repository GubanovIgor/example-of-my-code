import React, { FC } from 'react';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { FragmentRefs } from 'relay-runtime';

import { WinningsList } from './components';

interface Props {
  winnings?: {
    readonly ' $fragmentSpreads': FragmentRefs<'WinningsListItem_fragment'>;
  }[];
  onLoadNext: VoidFunction;
  onRefetch: VoidFunction;
  isLoadingNext: boolean;
  isRefetching: boolean;

  t: GetTranslationValue;
}

export const WinningsPresenter: FC<Props> = ({
  winnings,
  isLoadingNext,
  isRefetching,
  onLoadNext,
  onRefetch,
  t,
}) => (
  <WinningsList
    t={t}
    isRefetching={isRefetching}
    isLoadingNext={isLoadingNext}
    onLoadNext={onLoadNext}
    data={winnings}
    onRefetch={onRefetch}
  />
);
