import React, { FC } from 'react';
import { View } from 'react-native';
import { SubHeader } from 'components/SubHeader';

import { BetHistoryList } from './components';
import { styles } from './BetHistory.styles';
import { BetHistoryPresenterProps } from './BetHistory.types';

export const BetHistoryPresenter: FC<BetHistoryPresenterProps> = ({
  betHistory,
  isLoadingNext,
  isRefetching,
  onLoadNext,
  onRefetch,
  onPressGoPopular,
  t,
}) => (
  <>
    <SubHeader isBackButton title={t('BET_HISTORY')} />
    <View style={styles.container}>
      <BetHistoryList
        t={t}
        onPressPopular={onPressGoPopular}
        isRefetching={isRefetching}
        isLoadingNext={isLoadingNext}
        onLoadNext={onLoadNext}
        data={betHistory}
        onRefetch={onRefetch}
      />
    </View>
  </>
);
