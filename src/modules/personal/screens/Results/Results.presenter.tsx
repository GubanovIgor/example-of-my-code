import React, { FC } from 'react';
import { COLORS, GUTTER_SIZE } from 'config/theme';
import { VoidFunction } from 'core/interfaces';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';
import { getCurrencyWithAmount } from 'core/helpers';
import DepositIcon from 'assets/icons/depositCut.svg';
import WithdrawIcon from 'assets/icons/withdrawCut.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SubHeader } from 'components/SubHeader';

import { ResultCard } from './components';
import { styles } from './Results.styles';
import { GamingResults } from './Results.types';

interface Props {
  results?: GamingResults;
  isRefreshing: boolean;
  onRefresh: VoidFunction;
}
export const ResultsPresenter: FC<Props> = ({
  results,
  isRefreshing,
  onRefresh,
}) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const currencyShortSign = results?.currency?.shortSign;
  const currencySymbol = results?.currency?.symbol;

  return (
    <>
      <SubHeader isBackButton title={t('RESULTS.HEADER')} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: bottom + GUTTER_SIZE * 2 },
        ]}
        refreshControl={
          <RefreshControl
            tintColor={COLORS.ON_PRIMARY}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <ResultCard
          title={t('RESULTS.TOTAL_PLAYED')}
          value={getCurrencyWithAmount({
            shortSign: currencyShortSign,
            symbol: currencySymbol,
            amount: results?.played,
          })}
        />
        <ResultCard
          title={t('RESULTS.TOTAL_DEPOSITS')}
          icon={<DepositIcon />}
          value={getCurrencyWithAmount({
            shortSign: currencyShortSign,
            symbol: currencySymbol,
            amount: results?.deposit,
          })}
        />
        <ResultCard
          title={t('RESULTS.TOTAL_WITHDRAWALS')}
          icon={<WithdrawIcon />}
          value={getCurrencyWithAmount({
            shortSign: currencyShortSign,
            symbol: currencySymbol,
            amount: results?.withdrawal,
          })}
        />
        <ResultCard
          title={t('RESULTS.NET_POSITION')}
          value={getCurrencyWithAmount({
            shortSign: currencyShortSign,
            symbol: currencySymbol,
            amount: results?.netPossition,
          })}
        />
        <ResultCard
          title={t('RESULTS.TOTAL_WON')}
          value={getCurrencyWithAmount({
            shortSign: currencyShortSign,
            symbol: currencySymbol,
            amount: results?.won,
          })}
        />
        <ResultCard
          title={t('RESULTS.TOTAL_LOSS')}
          value={getCurrencyWithAmount({
            shortSign: currencyShortSign,
            symbol: currencySymbol,
            amount: results?.loss,
          })}
        />
        <ResultCard
          title={t('RESULTS.CASH_NET_POSITION')}
          value={getCurrencyWithAmount({
            shortSign: currencyShortSign,
            symbol: currencySymbol,
            amount: results?.cashNetPossition,
          })}
        />
      </ScrollView>
    </>
  );
};
