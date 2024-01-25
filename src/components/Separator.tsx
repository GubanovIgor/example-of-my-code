import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from 'config/theme';

interface ISeparatorProps {
  stylesProp?: StyleProp<ViewStyle>;
}

export const Separator = ({ stylesProp }: ISeparatorProps) => (
  <View style={[styles.separator, stylesProp]} />
);

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    marginHorizontal: '6%',
    borderColor: COLORS.GRAY_SEPARATOR,
  },
});
