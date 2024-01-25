import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TEXT_VARIANTS } from 'config/theme';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import ArrowToTopIcon from 'assets/icons/arrowToTop.svg';
import { useTranslation } from 'react-i18next';

import { styles } from './TournamentRules.styles';

export const TournamentRules = () => {
  const { t } = useTranslation();
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const handlePressRules = () => {
    setIsRulesOpen(!isRulesOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePressRules}
        style={styles.rulesTitleContainer}
      >
        <Text style={[TEXT_VARIANTS.font14Bold, styles.title]}>
          {t('TOURNAMENT_RULES.TITLE')}
        </Text>
        {isRulesOpen ? <ArrowToTopIcon /> : <ArrowToBottomIcon />}
      </TouchableOpacity>
      {isRulesOpen && (
        <>
          <Text style={[TEXT_VARIANTS.font14, styles.text]}>
            {t('TOURNAMENT_RULES.P1')}
          </Text>
          <Text style={[TEXT_VARIANTS.font14Bold, styles.text]}>
            {t('TOURNAMENT_RULES.P2')}
          </Text>
          <Text style={[TEXT_VARIANTS.font14, styles.text]}>
            {t('TOURNAMENT_RULES.P3')}
          </Text>
        </>
      )}
    </View>
  );
};
