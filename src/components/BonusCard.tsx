import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE } from 'config/theme';

export const BonusCard = () => (
  <View style={styles.container}>
    <View style={styles.bonusCard} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: GUTTER_SIZE * 5,
    paddingHorizontal: GUTTER_SIZE * 4,
  },
  bonusCard: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.TEXT_DARK,
    borderRadius: 12,
    shadowColor: COLORS.BACKGROUND,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});
