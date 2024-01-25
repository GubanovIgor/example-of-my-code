import { COLORS, TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { Text, View } from 'react-native';

import { TimerDigit } from '../TimerDigit';
import { styles } from './TimerSection.styles';

interface Props {
  text: string;
  time: string;
}

export const TimerSection = ({ time, text }: Props) => (
  <View style={styles.container}>
    <View style={styles.digits}>
      <TimerDigit symbol={time[0]} />
      <TimerDigit symbol={time[1]} />
    </View>
    <Text style={[TEXT_VARIANTS.font10, { color: COLORS.TEXT_GRAY }]}>
      {text}
    </Text>
  </View>
);
