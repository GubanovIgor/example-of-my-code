import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { getCountryIconByLang } from 'core/helpers';
import { VoidFunction } from 'core/interfaces';

import { styles } from './LanguageCard.styles';

interface LanguageCardProps {
  langTitle: string;
  langKey: string;
  showRightIcon?: boolean;
  onPress: VoidFunction;
}

export const LanguageCard: FC<LanguageCardProps> = ({
  langTitle,
  langKey,
  showRightIcon = true,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.leftContainer}>
      {getCountryIconByLang(langKey)}
      <Text style={[TEXT_VARIANTS.font16, styles.title]}>{langTitle}</Text>
    </View>
    {showRightIcon && <ArrowToBottomIcon fill={COLORS.TEXT_LIGHT} />}
  </TouchableOpacity>
);
