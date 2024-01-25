import { BonusTimer } from 'components/BonusTimer';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { BonusItem_fragment$key } from 'queries/__generated__/BonusItem_fragment.graphql';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { graphql, useFragment } from 'react-relay';
import HintIcon from 'assets/icons/hint.svg';

import { styles } from './BonusItem.styles';

const Fragment = graphql`
  fragment BonusItem_fragment on Bonus {
    bonusName
    bonusType
    expireDate
    state
    amount
    active
    campaignBlockedAmountMultiplier
    freeSpinCount
  }
`;

interface Props {
  bonusItemFragmentRef: BonusItem_fragment$key;
}

export const BonusItem = ({ bonusItemFragmentRef }: Props) => {
  const { t } = useTranslation();
  const bonusData = useFragment(Fragment, bonusItemFragmentRef);

  return (
    <View
      style={[styles.container, !bonusData.active && styles.expiredContainer]}
    >
      <View style={styles.header}>
        <View style={styles.timerContainer}>
          {bonusData.active ? (
            <>
              <Text style={[TEXT_VARIANTS.font12, styles.timerTitle]}>
                {t('EXPIRES_IN')}
              </Text>
              <BonusTimer expireDate={bonusData.expireDate} />
            </>
          ) : (
            <Text style={[TEXT_VARIANTS.font12, styles.timerTitle]}>
              {t('EXPIRED')}
            </Text>
          )}
        </View>
        <>
          <View style={styles.coloredBoxCurve} />
          <View style={styles.coloredBox}>
            <Text style={TEXT_VARIANTS.font14Bold}>
              {bonusData.freeSpinCount}
            </Text>
            <Text style={TEXT_VARIANTS.font14Bold}>Free spins</Text>
          </View>
        </>
      </View>

      <View style={styles.footer}>
        <Text style={[TEXT_VARIANTS.font18Bold, styles.bonusName]}>
          {bonusData.bonusName}
        </Text>
        <HintIcon width={18} height={18} fill={COLORS.DRAWER_ICON} />
      </View>
    </View>
  );
};
