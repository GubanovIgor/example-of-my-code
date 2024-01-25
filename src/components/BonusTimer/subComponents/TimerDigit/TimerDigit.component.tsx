import { TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './TimerDigit.styles';

export const TimerDigit = ({ symbol }: { symbol: string }) => (
  <View style={styles.container}>
    <Text style={[TEXT_VARIANTS.font14]}>{symbol}</Text>
  </View>
);
