import { COLORS, GUTTER_SIZE } from 'config/theme';
import React from 'react';
import { Text, View } from 'react-native';

export const TimerColon = () => (
  <View style={{ padding: GUTTER_SIZE }}>
    <Text style={{ color: COLORS.WHITE_60 }}>:</Text>
  </View>
);
