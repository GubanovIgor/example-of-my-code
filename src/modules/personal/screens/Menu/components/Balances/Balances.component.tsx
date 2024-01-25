import { useIsFocused } from '@react-navigation/native';
import { Button } from 'components/Button';
import { LoadingView } from 'components/LoadingView';
import { TEXT_VARIANTS } from 'config/theme';
import { getCurrencyWithAmount } from 'core/helpers';
import { LazyLoadQueryOptions, VoidFunction } from 'core/interfaces';
import { BalancesQuery } from 'queries/__generated__/BalancesQuery.graphql';
import React, { FC, memo, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { styles } from './Balances.styles';

const Query = graphql`
  query BalancesQuery {
    mainBalance: userAccount(type: MAIN) {
      id
      balance
      blockedAmount
      currency {
        id
        shortSign
        symbol
      }
    }
    bonusBalance: userAccount(type: TOTAL_BONUS) {
      id
      balance @required(action: THROW)
      blockedAmount @required(action: THROW)
      currency @required(action: THROW) {
        id
        shortSign @required(action: THROW)
        symbol
      }
    }
    freeSpinCount
  }
`;

interface BalancesProps {
  queryOptions?: LazyLoadQueryOptions;
}

export const BalancesSuspenseWrapper: FC = memo(() => {
  const { t } = useTranslation();
  const isMountedRef = useRef(false);
  const [refreshedQueryOptions, setRefreshedQueryOptions] =
    useState<LazyLoadQueryOptions>({
      fetchPolicy: 'store-and-network',
      fetchKey: 0,
    });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    if (isMountedRef.current) {
      handleRefreshQueryOptions();
    }

    isMountedRef.current = true;
  }, [isFocused]);

  const handleRefreshQueryOptions = () => {
    setRefreshedQueryOptions((prev) => ({
      ...prev,
      fetchKey: Number(prev?.fetchKey || 0) + 1,
    }));
  };

  const handleRefreshError = (resetError: VoidFunction) => () => {
    resetError();

    handleRefreshQueryOptions();
  };

  return (
    <Suspense
      fallback={<LoadingView containerStyles={styles.loaderOrErrorView} />}
    >
      <ErrorBoundary
        FallbackComponent={({ resetError }) => (
          <View style={styles.loaderOrErrorView}>
            <Text style={[TEXT_VARIANTS.font16, styles.errorMessage]}>
              {t('SOMETHING_WENT_WRONG')}
            </Text>
            <Button
              variant="outlined"
              text="Refresh"
              onPress={handleRefreshError(resetError)}
            />
          </View>
        )}
      >
        <Balances queryOptions={refreshedQueryOptions} />
      </ErrorBoundary>
    </Suspense>
  );
});

export const Balances: FC<BalancesProps> = ({ queryOptions }) => {
  const balancesData = useLazyLoadQuery<BalancesQuery>(Query, {}, queryOptions);
  const { t } = useTranslation();

  const { bonusBalance, freeSpinCount, mainBalance } = balancesData;

  const bonusBalanceValue = getCurrencyWithAmount({
    shortSign: bonusBalance?.currency?.shortSign,
    symbol: bonusBalance?.currency?.symbol,
    amount: bonusBalance?.balance?.toString(),
  });

  const mainBalanceValue = getCurrencyWithAmount({
    shortSign: mainBalance?.currency?.shortSign,
    symbol: mainBalance?.currency?.symbol,
    amount: mainBalance?.balance?.toString(),
  });
  return (
    <View>
      <View style={styles.mainBalanceContainer}>
        <Text style={[TEXT_VARIANTS.font14, styles.mainBalanceTitle]}>
          {t('MAIN_BALANCE')}
        </Text>
        <Text style={[TEXT_VARIANTS.font24Bold]}>{mainBalanceValue}</Text>
      </View>
      <View style={styles.bonusContainer}>
        <View style={styles.bonusWidget}>
          <Text style={[TEXT_VARIANTS.font12, styles.bonusTitle]}>
            {t('BONUS_BALANCE')}
          </Text>
          <Text style={[TEXT_VARIANTS.font18, styles.bonusBalanceAmount]}>
            {bonusBalanceValue}
          </Text>
        </View>
        <View style={styles.bonusWidget}>
          <Text style={[TEXT_VARIANTS.font12, styles.bonusTitle]}>
            {t('FREE_SPINS')}
          </Text>
          <Text style={[TEXT_VARIANTS.font18, styles.freeSpinsAmount]}>
            {freeSpinCount}
          </Text>
        </View>
      </View>
    </View>
  );
};
