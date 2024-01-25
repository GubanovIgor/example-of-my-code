import React from 'react';
import { View, Text } from 'react-native';
import { TEXT_VARIANTS } from 'config/theme';
import { useTranslation } from 'react-i18next';

import { styles } from './AboutTournamentText.styles';

export const AboutTournamentText = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[TEXT_VARIANTS.font14Bold, styles.title]}>
        {t('TOURNAMENT.ABOUT_TOURNAMENT')}
      </Text>
      <Text style={[TEXT_VARIANTS.font14, styles.text]}>
        {t('TOURNAMENT.ABOUT_TOURNAMENT_P1')}
      </Text>
      <Text style={[TEXT_VARIANTS.font14, styles.text]}>
        {t('TOURNAMENT.ABOUT_TOURNAMENT_P2')}
      </Text>
    </View>
  );
};
