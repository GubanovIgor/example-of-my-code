import { TEXT_VARIANTS } from 'config/theme';
import { getCurrencyWithAmount } from 'core/helpers';
import { BonusBalanceQuery } from 'queries/__generated__/BonusBalanceQuery.graphql';
import React, { FC, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { styles } from './BonusBalance.styles';

const Query = graphql`
  query BonusBalanceQuery {
    freeSpinCount
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
  }
`;

export const BonusBalanceSuspenseWrapper = () => (
  <Suspense>
    <BonusBalance />
  </Suspense>
);

export const BonusBalance: FC = ({}) => {
  const { t } = useTranslation();
  const bonusesData = useLazyLoadQuery<BonusBalanceQuery>(Query, {});
  const { bonusBalance, freeSpinCount } = bonusesData || {};

  const currencyWithAmount = getCurrencyWithAmount({
    shortSign: bonusBalance?.currency?.shortSign,
    symbol: bonusBalance?.currency?.symbol,
    amount: bonusBalance?.balance?.toString(),
  });

  return (
    <View style={styles.container}>
      <View style={styles.widget}>
        <Text style={[TEXT_VARIANTS.font12, styles.title]}>
          {t('BONUS_BALANCE')}
        </Text>
        <Text style={[TEXT_VARIANTS.font18, styles.balanceAmount]}>
          {currencyWithAmount}
        </Text>
      </View>
      <View style={styles.widget}>
        <Text style={[TEXT_VARIANTS.font12, styles.title]}>
          {t('FREE_SPINS')}
        </Text>
        <Text style={[TEXT_VARIANTS.font18, styles.freeSpinsAmount]}>
          {freeSpinCount}
        </Text>
      </View>
    </View>
  );
};
