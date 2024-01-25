import { TEXT_VARIANTS } from 'config/theme';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './TextField.styles';

interface TextFieldProps {
  label: string;
  value?: string | null;
}
export const TextField: FC<TextFieldProps> = ({ label, value = '' }) => (
  <View style={styles.container}>
    <Text style={[TEXT_VARIANTS.font12, styles.label]}>{label}</Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={[TEXT_VARIANTS.font14, styles.value]}
    >
      {value || 'Not specified'}
    </Text>
  </View>
);
