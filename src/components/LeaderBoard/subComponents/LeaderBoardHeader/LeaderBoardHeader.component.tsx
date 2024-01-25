import { TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

import { styles } from './LeaderBoardHeader.styles';

export const LeaderBoardHeader = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[TEXT_VARIANTS.font10, styles.text, styles.flex1]}>#</Text>
      <Text style={[TEXT_VARIANTS.font10, styles.text, styles.flex4]}>
        {t('LEADERBOARD.PLAYER')}
      </Text>
      <Text style={[TEXT_VARIANTS.font10, styles.text, styles.flex3]}>
        {t('LEADERBOARD.POINTS')}
      </Text>
      <Text style={[TEXT_VARIANTS.font10, styles.text, styles.flex3]}>
        {t('LEADERBOARD.PRIZE')}
      </Text>
    </View>
  );
};
